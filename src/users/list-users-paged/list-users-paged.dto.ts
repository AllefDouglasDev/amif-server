import { UserSortBy } from '../../repository/user.repository';
import { PagedRequest, PagedResponse } from '../../common/entities/paged';

export class ListUsersPagedInputDto extends PagedRequest<UserSortBy> {
  creatorId: string;
}

export type ListUsersPagedOutputDto = PagedResponse<{
  id: string;
  username: string;
  createdAt: Date;
  creator?: {
    id: string;
    username: string;
  };
}>;
