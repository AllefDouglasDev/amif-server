import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../common/guards/jwt.guard';
import { SignInInputDto, SignInOutputDto } from './sign-in/sign-in.dto';
import { SignInService } from './sign-in/sign-in.service';
import { UserId } from '../common/decorators/user-id.decorator';
import { ProfileService } from './profile/profile.service';

@Controller('auth')
export class AuthController {
  constructor(
    private signInService: SignInService,
    private profileService: ProfileService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  profile(@UserId() id: string) {
    return this.profileService.execute({ id });
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.CREATED)
  signIn(@Body() input: SignInInputDto): Promise<SignInOutputDto> {
    return this.signInService.execute(input);
  }
}
