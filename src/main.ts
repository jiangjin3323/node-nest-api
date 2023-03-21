import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middleWareAll } from './auth/auth';
import { HttpFilter } from './common/errFilter';
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1'); // 设置全局路由前缀
  app.use(cors()) //处理跨域
  app.use(middleWareAll); //全局中间件
  app.useGlobalFilters(new HttpFilter()) //全局异常拦截
  await app.listen(3200);
}
bootstrap();
