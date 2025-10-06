import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // key bí mật
      signOptions: { expiresIn: '1h' },            // token sống 1h
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
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