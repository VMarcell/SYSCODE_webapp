import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

export async function createApp(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  return app;
}

async function bootstrap() {
  const app = await createApp();
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
