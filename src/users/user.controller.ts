import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { UserId } from '../common/decorators/user-id.decorator';
import { CreateUserService } from './create-user/create-user.service';
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from './create-user/create-user.dto';
import {
  ListUsersPagedInputDto,
  ListUsersPagedOutputDto,
} from './list-users-paged/list-users-paged.dto';
import { ListUsersPagedService } from './list-users-paged/list-users-paged.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private listUsersPagedService: ListUsersPagedService,
    private createUserService: CreateUserService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.CREATED)
  listUsersPaged(
    @UserId() creatorId: string,
    @Query() input: ListUsersPagedInputDto,
  ): Promise<ListUsersPagedOutputDto> {
    return this.listUsersPagedService.execute({ ...input, creatorId });
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @UserId() creatorId: string,
    @Body() input: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    return this.createUserService.execute({ ...input, creatorId });
  }
}
