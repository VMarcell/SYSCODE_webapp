import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material modulok:
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  studentForm!: FormGroup;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {}

  selectedStudentId: string | null = null;

  editStudent(student: Student) {
    this.selectedStudentId = student.id!;
    this.studentForm.setValue({
      name: student.name,
      email: student.email
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;
  
    const student = this.studentForm.value;
  
    if (this.selectedStudentId) {
      this.studentService.update(this.selectedStudentId, student).subscribe(() => {
        this.loadStudents();
        this.studentForm.reset();
        this.selectedStudentId = null;
      });
    } else {
      this.studentService.create(student).subscribe(() => {
        this.loadStudents();
        this.studentForm.reset();
      });
    }
  }
  
  
  displayedColumns: string[] = ['name', 'email', 'actions'];

  ngOnInit(): void {
    this.loadStudents();
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadStudents() {
    this.studentService.getAll().subscribe((data) => {
      this.students = data;
    });
  }

  addStudent() {
  if (this.studentForm.invalid) return;

  const studentData = this.studentForm.value;

  const request = this.selectedStudentId
    ? this.studentService.update(this.selectedStudentId, studentData)
    : this.studentService.create(studentData);

  request.subscribe(() => {
    this.studentForm.reset({ name: '', email: '' });
    this.selectedStudentId = null;
    this.loadStudents();
  });
}

  deleteStudent(id: string) {
    this.studentService.delete(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
