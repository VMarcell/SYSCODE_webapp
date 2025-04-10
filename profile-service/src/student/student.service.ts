import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepo.find();
  }

  findOne(id: string): Promise<Student> {
    return this.studentRepo.findOneByOrFail({ id });
  }

  create(data: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create(data);
    return this.studentRepo.save(student);
  }

  async update(id: string, data: UpdateStudentDto): Promise<Student> {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    Object.assign(student, data);
    return this.studentRepo.save(student);
  }

  async delete(id: string): Promise<void> {
    await this.studentRepo.delete(id);
  }
}
