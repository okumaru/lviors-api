import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controler';
import { UserAuthService } from './user-auth.service';

@Module({
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthModule]
})
export class UserAuthModule {}