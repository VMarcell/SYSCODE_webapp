import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './student-list/student-list.component';

@NgModule({
  declarations: [StudentListComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class StudentModule {}
