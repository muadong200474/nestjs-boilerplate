import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    return this.prismaService.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
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
