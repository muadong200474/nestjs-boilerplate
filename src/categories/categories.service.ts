import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { NullableType } from 'src/common/types/nullable.type';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prismaService.category.create({ data });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, where, orderBy } = params;
    return this.prismaService.category.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  findOne(
    categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput,
  ): Promise<NullableType<Category>> {
    return this.prismaService.category.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.category.update({ where, data });
  }

  remove(where: Prisma.CategoryWhereUniqueInput): Promise<Category> {
    return this.prismaService.category.delete({ where });
  }
}
