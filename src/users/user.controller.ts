import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { UserId } from '../common/decorators/user-id.decorator';
import { CreateUserService } from './create-user/create-user.service';
import {
  CreateUserInputDto,
  CreateUserOutputDto,
} from './create-user/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private createUserService: CreateUserService) {}

  @Post('/')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  createUser(
    @UserId() creatorId: string,
    @Body() input: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    return this.createUserService.execute({ ...input, creatorId });
  }
}
