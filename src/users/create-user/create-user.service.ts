import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { EncryptionService } from '../../common/encryption/encryption.service';
import { CreateUserInputDto, CreateUserOutputDto } from './create-user.dto';
import { InputError } from '../../common/exceptions/input-error';
import { IdGenerator } from '../../common/id-generator';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private encryptionService: EncryptionService,
  ) {}

  async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const userWithSameUsername = await this.userRepository.findByUsername(
      input.username.toLowerCase(),
    );
    if (userWithSameUsername) {
      throw new InputError([
        {
          name: 'username',
          message: 'Nome do usuário já está sendo utilizado',
        },
      ]);
    }
    const user = {
      id: IdGenerator.generateUUID(),
      creatorId: input.creatorId,
      username: input.username.toLowerCase(),
      password: await this.encryptionService.encrypt(input.password),
      isDeleted: false,
    };
    await this.userRepository.save(user);
    return { userId: user.id };
  }
}
