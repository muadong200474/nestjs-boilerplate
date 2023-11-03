import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/auth.guard';

@Controller('api/v1/admin/posts')
@ApiTags('Admin-Posts')
@Roles(Role.ADMIN)
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class PostsAdminController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('published')
  findPublished() {
    return this.postsService.findAll({
      where: { published: true, deleted: false },
    });
  }

  @Get('drafts')
  findDrafts() {
    return this.postsService.findAll({
      where: { published: false, deleted: false },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne({ id: +id });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove({ id: +id });
  }
}
