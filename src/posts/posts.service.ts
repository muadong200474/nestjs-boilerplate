import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { NullableType } from 'src/common/types/nullable.type';
import { PaginationResponse } from 'src/pagination/pagination.response';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({ data });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<PaginationResponse<Post[]>> {
    const { page, limit, where, orderBy } = params;
    const currentPage = page || 1;
    const pageSize = limit || 10;

    const data = await this.prismaService.post.findMany({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      where,
      orderBy,
    });
    const totalCount = await this.prismaService.post.count({ where });
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
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<NullableType<Post>> {
    return this.prismaService.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.post.update({ where, data });
  }

  remove(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prismaService.post.delete({ where });
  }
}
