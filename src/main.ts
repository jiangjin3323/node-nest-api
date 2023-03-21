import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleWareAll } from './auth/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1'); // 设置全局路由前缀
  app.use(middleWareAll);
  await app.listen(3200);
}
bootstrap();
