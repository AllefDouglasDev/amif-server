import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './create-user/create-user.service';

@Module({
  controllers: [UserController],
  providers: [CreateUserService],
})
export class UserModule {}
