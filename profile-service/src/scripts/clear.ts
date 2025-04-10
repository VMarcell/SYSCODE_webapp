import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from '../student/student.entity';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const studentRepo = app.get<Repository<Student>>(
    getRepositoryToken(Student),
  );

  await studentRepo.clear();
  console.log('✅ Adatbázis kiürítve');

  await app.close();
}

bootstrap();
