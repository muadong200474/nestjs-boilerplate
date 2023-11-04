import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Prisma } from '@prisma/client';
import { NullableType } from 'src/common/types/nullable.type';
import { PaginationResponse } from 'src/pagination/pagination.response';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prismaService.category.create({ data });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<PaginationResponse<Category[]>> {
    const { page, limit, where, orderBy } = params;
    const currentPage = page || 1;
    const pageSize = limit || 10;

    const data = await this.prismaService.category.findMany({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      where,
      orderBy,
    });
    const totalCount = await this.prismaService.category.count({ where });
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
