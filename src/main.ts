import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleWareAll } from './auth/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleWareAll);
  await app.listen(3200);
}
bootstrap();
