import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// Đây là guard để bảo vệ route.

// Khi bạn viết @UseGuards(JwtAuthGuard) trên controller, NestJS sẽ:

// Check header có token không

// Verify token bằng JwtStrategy

// Nếu hợp lệ → gán req.user = payload từ token

// Nếu không hợp lệ → trả 401 Unauthorized



// Guard này làm 2 việc chính:

// Lấy token từ header (theo config trong JwtStrategy)

// Gọi JwtStrategy.validate(payload) để verify token