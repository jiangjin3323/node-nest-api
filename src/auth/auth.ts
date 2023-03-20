import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'mysecretkey';

  async createToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
