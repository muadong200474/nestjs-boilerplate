import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { NullableType } from 'src/common/types/nullable.type';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prismaService.post.create({ data });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, where, orderBy } = params;
    return this.prismaService.post.findMany({
      skip,
      take,
      where,
      orderBy,
    });
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
