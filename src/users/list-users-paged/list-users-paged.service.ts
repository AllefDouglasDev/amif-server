import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import {
  ListUsersPagedInputDto,
  ListUsersPagedOutputDto,
} from './list-users-paged.dto';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 15;
const DEFAULT_SORT_BY = 'username';
const DEFAULT_ORDER_BY = 'asc';

@Injectable()
export class ListUsersPagedService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    input: ListUsersPagedInputDto,
  ): Promise<ListUsersPagedOutputDto> {
    const { total, users } = await this.userRepository.listPaged({
      page: input.page || DEFAULT_PAGE,
      perPage: input.perPage || DEFAULT_PER_PAGE,
      creatorId: input.creatorId,
      sortBy: input.sortBy || DEFAULT_SORT_BY,
      orderBy: input.orderBy || DEFAULT_ORDER_BY,
    });
    const totalPages = Math.ceil(total / (input.perPage || DEFAULT_PER_PAGE));
    const data = users.map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
      creator: user.creator
        ? {
            id: user.creator.id,
            username: user.creator.username,
          }
        : undefined,
    }));
    return {
      data,
      total,
      totalPages,
      page: input.page || 1,
      perPage: input.perPage || DEFAULT_PER_PAGE,
    };
  }
}
