import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-1gio') {}

// Đây là guard để bảo vệ route.

// Khi bạn viết @UseGuards(JwtAuthGuard) trên controller, NestJS sẽ:

// Check header có token không

// Verify token bằng JwtStrategy

// Nếu hợp lệ → gán req.user = payload từ token

// Nếu không hợp lệ → trả 401 Unauthorized



// Guard này làm 2 việc chính:

// Lấy token từ header (theo config trong JwtStrategy)

// Gọi JwtStrategy.validate(payload) để verify token


// Nếu không viết 'jwt-1gio'

// Nếu em bỏ tên đi, thì mặc định tên strategy sẽ là "jwt".
// Ví dụ:

// export class JwtStrategy extends PassportStrategy(Strategy) { ... }


// thì sẽ tương đương với AuthGuard('jwt').

// Do đó, nếu em muốn dùng AuthGuard() mà không ghi gì (AuthGuard()), thì trong module em phải đăng ký PassportModule.register({ defaultStrategy: 'jwt' }).