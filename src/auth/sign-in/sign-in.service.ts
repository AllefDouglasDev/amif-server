import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../../common/encryption/encryption.service';
import { InvalidCredentialsError } from '../../common/exceptions/invalid-credentials.exception';
import { TokenService } from '../../common/token/token.service';
import { UserRepository } from '../../repository/user.repository';
import { SignInInputDto, SignInOutputDto } from './sign-in.dto';

@Injectable()
export class SignInService {
  constructor(
    private userRepository: UserRepository,
    private encryptionService: EncryptionService,
    private tokenService: TokenService,
  ) {}

  async execute(input: SignInInputDto): Promise<SignInOutputDto> {
    const user = await this.userRepository.findByUsername(input.username);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const hasValidPassword = await this.encryptionService.compare(
      input.password,
      user.password,
    );
    if (!hasValidPassword) {
      throw new InvalidCredentialsError();
    }
    const token = await this.tokenService.createToken(user.id);
    return {
      token,
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      creator: user.creator,
    };
  }
}
