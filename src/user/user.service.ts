import { Injectable,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { interfaceReturnType } from '../type/type';
import { AuthService } from '../auth/auth';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userList: Repository<User>,
    private readonly auth: AuthService,
  ) {}

  async findUser(user: { account: string }): Promise<User[]> {
    const userList = await this.userList.find({
      where: user,
    });
    return userList;
  }
  async login(user: {
    account: string;
    password: string;
  }): Promise<interfaceReturnType> {
    const userList: User[] = await this.findUser({ account: user.account });
    if (userList.length < 1) return await this.register(user);
    if (userList[0].password === user.password) {
      return {
        msg: ' OK',
        data: {
          name: userList[0].name,
          sign: userList[0].sign,
        },
        code: HttpStatus.OK,
      };
    }
    return {
      msg: '账号或密码输入错误～',
      data: null,
      code: HttpStatus.FORBIDDEN,
    };
  }

  async register(user: {
    account: string;
    password: string;
  }): Promise<interfaceReturnType> {
    await this.userList.save({
      ...user,
      name: user.account,
      sign: '',
    });
    const userList: User[] = await this.findUser({ account: user.account });
    const token: string = await this.auth.createToken(userList[0].id);
    await this.userList.update(userList[0].id, {
      ...userList[0],
      sign: token,
    });
    return {
      msg: 'ok',
      data: {
        name: userList[0].name,
        sign: token,
      },
      code: HttpStatus.OK,
    };
  }
}
