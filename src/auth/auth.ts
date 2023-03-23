import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/************ token 鉴权 中间件 start ***************/
const whiteList: string[] = ['/api/v1/login'];
export const middleWareAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('全局中间件！');
  if (whiteList.includes(req.originalUrl)) {
    next();
    return;
  }
  //get 请求不鉴权
  if (req.method === 'GET') {
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
