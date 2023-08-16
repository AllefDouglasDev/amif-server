import { EncryptionService } from '../../common/encryption/encryption.service';
import { NotFoundError } from '../../common/exceptions/not-found.exception';
import { UserRepository } from '../../repository/user.repository';
import { UpdateUserInputDto } from './update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserService {
  constructor(
    private userRepository: UserRepository,
    private encryptionService: EncryptionService,
  ) {}

  async execute(input: UpdateUserInputDto): Promise<void> {
    const user = await this.userRepository.findById(input.id);
    if (!user || user.id !== input.id) throw new NotFoundError('user');
    user.username = input.username;
    if (input.password) {
      user.password = await this.encryptionService.encrypt(input.password);
    }
    await this.userRepository.update(user);
  }
}
