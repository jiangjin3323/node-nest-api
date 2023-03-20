import { Controller, Get, Post, Body,Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    console.log(user)
    return this.userService.create(user);
  }
}
