import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, TokenService, AuthService],
  controllers: [UserController, AuthController],
  exports: [UserService],
})
export class UserModule {}
