import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { ProfileInputDto, ProfileOutputDto } from './profile.dto';
import { NotFoundError } from '../../common/exceptions/not-found.exception';

@Injectable()
export class ProfileService {
  constructor(private userRepository: UserRepository) {}

  async execute(input: ProfileInputDto): Promise<ProfileOutputDto> {
    const user = await this.userRepository.findById(input.id);
    if (!user) {
      throw new NotFoundError('user');
    }
    return {
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
      creator: user.creator
        ? {
            id: user.creator.id,
            username: user.creator.username,
          }
        : undefined,
    };
  }
}
