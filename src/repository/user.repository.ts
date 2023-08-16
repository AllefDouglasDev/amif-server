import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '../common/entities/user';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  findByUsername(username: string) {
    return this.prisma.users.findUnique({
      where: { username, is_deleted: false },
      include: {
        creator: {
          select: { id: true, username: true },
        },
      },
    });
  }

  findById(id: string) {
    return this.prisma.users.findUnique({
      where: { id, is_deleted: false },
      include: {
        creator: {
          select: { id: true, username: true },
        },
      },
    });
  }

  save(user: User) {
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
}
