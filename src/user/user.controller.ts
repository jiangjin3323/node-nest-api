import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { interfaceReturnType } from '../type/type';
import { Response } from 'express';
@Controller('login')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async loginFunc(@Body() user: any, @Res() Res: Response): Promise<interfaceReturnType> {
    const res = await this.userService.loginAndRegister(user);
    Res.status(res.code).json(res);
    return;
  }
}