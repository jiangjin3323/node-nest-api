import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { AuthService } from '../auth/auth';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userList: Repository<User>,
    private readonly auth: AuthService,
  ) {}

  async findUser(user: { password: string; account: string }): Promise<User[]> {
    const userList = await this.userList.find({
      where: user,
    });
    return userList;
  }

  async login(user: {
    account: string;
    password: string;
  }): Promise<{ name: string; sign: string }> {
    const userList: User[] = await this.findUser(user);
    if (userList.length > 0) {
      return {
        name: userList[0].name,
        sign: userList[0].sign,
      };
    }
    return await this.register(user)
  }

  async register(user: {
    account: string;
    password: string;
  }): Promise<{ name: string; sign: string }> {
    await this.userList.save({
      ...user,
      name: '',
      sign: '',
    });
    const userList: User[] = await this.findUser(user);
    const token: string = await this.auth.createToken(userList[0].id);
    console.log(token)
    await this.userList.update(userList[0].id, {
      ...userList[0],
      sign: token,
    });
    return {
      name: userList[0].name,
      sign: token,
    };
  }
}
