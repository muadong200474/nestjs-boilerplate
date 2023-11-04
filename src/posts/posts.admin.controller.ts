import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/auth.guard';
import { PaginationDto } from 'src/pagination/pagination.dto';

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

  @Get()
  findAll(@Query() params: PaginationDto) {
    return this.postsService.findAll({
      page: Number(params?.page),
      limit: Number(params?.limit),
      where: { published: true, deleted: false },
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
