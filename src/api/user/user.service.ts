import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from '../../entity/user.entity';
import { interfaceReturnType } from '../../type/type';
@Injectable()
export class UserService {
  private readonly JWT_SECRET = 'mysecretkey';
  constructor(
    @InjectRepository(User)
    private readonly userList: Repository<User>,
  ) {}

  //查询user表指定用户函数
  async findUser(user: { account: string }): Promise<User[]> {
    const userList = await this.userList.find({
      where: user,
    });
    return userList;
  }

  //登录函数
  async login(
    user: {
      account: string;
      password: string;
    },
    userList: User[],
  ): Promise<interfaceReturnType> {
    if (userList[0].password === user.password) {
      const token: string = await this.createToken(userList[0].id);
      await this.userList.update(userList[0].id, {
        loginTime: new Date(),
        sign: token,
      });
      return {
        msg: ' OK',
        data: {
          name: userList[0].name,
          sign: token,
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

  //注册函数
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
    const token: string = await this.createToken(userList[0].id);
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

  //登录结合注册接口返回函数
  async loginAndRegister(user: {
    account: string;
    password: string;
  }): Promise<interfaceReturnType> {
    const userList: User[] = await this.findUser({ account: user.account });
    //user表查询不到执行注册
    if (userList.length < 1) return await this.register(user);
    //执行登录
    return await this.login(user, userList);
  }

  //token 生成函数
  async createToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }
}
