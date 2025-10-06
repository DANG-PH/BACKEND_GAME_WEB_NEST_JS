import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // key bí mật
      signOptions: { expiresIn: '1h' },            // token sống 1h
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
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