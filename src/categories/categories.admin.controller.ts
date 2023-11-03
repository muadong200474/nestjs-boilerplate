import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCagetoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/admin/categories')
@ApiTags('Admin-Categories')
export class CategoriesAdminController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll({});
  }

  @Post()
  async create(@Body() data: CreateCagetoryDto) {
    return this.categoryService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update({
      where: { id: +id },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove({ id: +id });
  }
}
