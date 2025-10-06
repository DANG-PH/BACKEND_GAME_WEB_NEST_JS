import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    const payload = { username: user.username, role: user.role};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

//quản lý JWT, login, các logic liên quan xác thực.