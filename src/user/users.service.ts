import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { page, limit, where, orderBy } = params;
    const currentPage = page || 1;
    const pageSize = limit || 10;

    const data = await this.prismaService.user.findMany({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      where,
      orderBy,
    });
    const totalCount = await this.prismaService.user.count({ where });
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data,
      metadata: {
        pageSize,
        currentPage,
        totalCount,
        totalPages,
        hasNextPage: currentPage < totalPages,
      },
    };
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({ where });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.user.update({ data, where });
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.delete({ where });
  }
}
