// src/student/student.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('StudentController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a student (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/students')
      .send({ name: 'Teszt Diák', email: 'diak@pelda.hu' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    createdId = response.body.id;
    expect(response.body.name).toBe('Teszt Diák');
    expect(response.body.email).toBe('diak@pelda.hu');
  });

  it('should get all students (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/students')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should update the student (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put(`/students/${createdId}`)
      .send({ name: 'Frissített Név' })
      .expect(200);

    expect(response.body.name).toBe('Frissített Név');
  });

  it('should delete the student (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/students/${createdId}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
