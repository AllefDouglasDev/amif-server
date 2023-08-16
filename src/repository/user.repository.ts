import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../common/entities/user';
import { Order } from '../common/entities/paged';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { username, is_deleted: false },
      include: {
        creator: {
          select: { id: true, username: true },
        },
      },
    });
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      creator: user.creator,
      isDeleted: user.is_deleted,
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: { id, is_deleted: false },
      include: {
        creator: {
          select: { id: true, username: true },
        },
      },
    });
    if (!user) return null;
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      creator: user.creator,
      isDeleted: user.is_deleted,
    };
  }

  async listPaged(args: ListUsersPagedArgs) {
    const total = await this.prisma.users.count({
      where: { creator_id: args.creatorId, is_deleted: false },
    });
    const users = await this.prisma.users.findMany({
      where: { creator_id: args.creatorId, is_deleted: false },
      take: args.perPage,
      skip: args.perPage * (args.page - 1),
      orderBy: {
        [args.sortBy]: args.orderBy,
      },
      include: {
        creator: {
          select: { id: true, username: true },
        },
      },
    });
    return { users, total };
  }

  create(user: User) {
    return this.prisma.users.create({
      data: {
        id: user.id,
        username: user.username,
        password: user.password,
        creator_id: user.creatorId,
        is_deleted: user.isDeleted,
      },
    });
  }

  update(user: User) {
    return this.prisma.users.update({
      data: {
        username: user.username,
        password: user.password,
      },
      where: { id: user.id },
    });
  }
}

export interface UserSortBy {
  username: string;
  createdAt: string;
}

export type ListUsersPagedArgs = {
  page: number;
  perPage: number;
  creatorId: string;
  username?: string;
  createdAt?: string;
  sortBy: keyof UserSortBy;
  orderBy: Order;
};
