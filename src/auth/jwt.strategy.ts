import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-1gio') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'haidang2809', // key bí mật
    });
  }

  async validate(payload: any) {
    return {username: payload.username, role: payload.role }; // sẽ gắn vào req.user
  }
}

//JwtStrategy là nơi xác thực JWT và trích xuất thông tin user từ token.


// 1. Phân biệt JwtModule và JwtStrategy

// JwtModule (từ @nestjs/jwt):

// Cung cấp service (JwtService) để tạo và verify JWT token.

// Ví dụ: jwtService.sign(payload) hoặc jwtService.verify(token).

// Nói nôm na: cái này giúp mình xài JWT, nhưng nó chưa định nghĩa "guard" hay "strategy" nào cả.

// JwtStrategy (class của mình extend từ PassportStrategy):

// Là nơi định nghĩa cách Passport xác thực token.

// Ở đây mình phải nói rõ:

// Lấy token từ đâu (jwtFromRequest → header Bearer token).

// Dùng secret nào để verify (secretOrKey).

// Hết hạn có bỏ qua không (ignoreExpiration).

// Sau khi verify, dữ liệu payload nào sẽ gắn vào req.user (validate).
