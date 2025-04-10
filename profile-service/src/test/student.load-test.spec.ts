import * as request from 'supertest';
import { createApp } from '../main';

jest.setTimeout(600000);
describe('Load Test: Adding 10,000 Students', () => {
  let app;

  beforeAll(async () => {
    const instance = await createApp();
    await instance.init();
    app = instance.getHttpServer();
  });

  it('should add 10,000 students and measure time', async () => {
    const studentPayload = {
      name: 'Test Student',
      email: 'teststudent@example.com',
    };

    const startTime = Date.now();

    for (let i = 0; i < 10000; i++) {
      const response = await request(app)
        .post('/students')
        .send(studentPayload)
        .expect(201);

      expect(response.body.name).toBe(studentPayload.name);
      expect(response.body.email).toBe(studentPayload.email);
    }

    const endTime = Date.now();
    const executionTime = endTime - startTime;
    console.log(`Time taken to add 10,000 students: ${executionTime}ms`);
  });
});
