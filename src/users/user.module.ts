import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './create-user/create-user.service';
import { ListUsersPagedService } from './list-users-paged/list-users-paged.service';
import { UpdateUserService } from './update-user/update-user.service';

@Module({
  controllers: [UserController],
  providers: [ListUsersPagedService, CreateUserService, UpdateUserService],
})
export class UserModule {}
