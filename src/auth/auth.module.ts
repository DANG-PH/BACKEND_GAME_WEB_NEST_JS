import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }), Dòng này thì @UseGuards(AuthGuard())  → Nest sẽ hiểu bạn đang dùng AuthGuard('jwt'), Nếu không có dòng này, bạn phải ghi AuthGuard('jwt') ở mọi nơi.
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'haidang2809', // key bí mật
      signOptions: { expiresIn: '1h' },            // token sống 1h
    }),
    // Nó có 2 việc chính:
    // Tạo token khi người dùng đăng nhập
    // Kiểm tra token khi người dùng gọi API
  ], // các module khác mà AuthModule cần
  providers: [AuthService, JwtStrategy, JwtAuthGuard], // các service, guard, strategy mà AuthModule cung cấp
  exports: [AuthService, JwtModule], // những gì muốn chia sẻ cho module khác
})
export class AuthModule {}


// Client login
//    │
//    ▼
// POST /login
// AuthService.login() → tạo JWT token → trả về client
//    │
//    ▼
// Client lưu token
//    │
//    ▼
// GET /profile (kèm token)
//    │
//    ▼
// @UseGuards(JwtAuthGuard)
//    │
//    ▼
// JwtStrategy.validate(payload) → req.user = { userId, username }
//    │
//    ▼
// Controller getProfile()
//    │
//    ▼
// userService.findByUsername(req.user.username)
//    │
//    ▼
// Trả user info (không có password) cho client