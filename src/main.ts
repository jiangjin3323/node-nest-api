import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/************ token 鉴权 中间件 start ***************/
//白名单
const whiteList: string[] = ['/login'];
const middleWareAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (whiteList.includes(req.originalUrl)) {
    next();
    return;
  }
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      data: null,
      msg: '身份信息未验证通过～',
      code: HttpStatus.UNAUTHORIZED,
    });
  }
  try {
    const res = jwt.verify(token, 'mysecretkey');
    next();
  } catch (e) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      data: null,
      msg: '身份信息已过期',
      code: HttpStatus.UNAUTHORIZED,
    });
  }
};
/************ token 鉴权 中间件 end ***************/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middleWareAll);
  await app.listen(3200);
}
bootstrap();
