import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async loginFunc(
    @Body() user:any,
  ): Promise<{ name: string; sign: string } | {msg:string}> {
    return this.userService.login(user);
  }
}
