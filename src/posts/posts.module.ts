import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsAdminController } from './posts.admin.controller';

@Module({
  controllers: [PostsController, PostsAdminController],
  providers: [PostsService],
  imports: [PrismaModule],
})
export class PostsModule {}
