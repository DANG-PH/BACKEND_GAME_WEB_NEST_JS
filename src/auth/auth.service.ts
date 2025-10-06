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

// ➡️ Token này gồm:

// header (thuật toán ký)

// payload (thông tin người dùng)

// signature (chữ ký hash bằng secret key)

// Nếu ai đó cố đổi payload, ví dụ đổi "role": "USER" → "ADMIN",
// thì chữ ký mới không còn khớp với chữ ký cũ → token bị vô hiệu hóa.

// header.payload.signature

// Khi gửi lên server, JwtStrategy sẽ kiểm tra:

// jwt.verify(token, secret);

// Lúc này:

// Server lấy lại header + payload mới,

// Dùng secret để tự tạo signature lại,

// So sánh với signature trong token.

// → Vì payload bị thay đổi nên 2 chữ ký khác nhau → lỗi 401 Unauthorized.