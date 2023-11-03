import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/user/posts')
@ApiTags('User-Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll({
      where: { published: true, deleted: false },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update({
      where: { id: +id },
      data: updatePostDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove({ id: +id });
  }
}
