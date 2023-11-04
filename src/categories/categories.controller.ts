import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Category, Role } from '@prisma/client';
import { RoleGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationDto } from 'src/pagination/pagination.dto';
import { PaginationResponse } from 'src/pagination/pagination.response';

@Controller('api/v1/user/categories')
@ApiTags('User-Categories')
@Roles(Role.USER)
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(
    @Query() params: PaginationDto,
  ): Promise<PaginationResponse<Category[]>> {
    return this.categoriesService.findAll({
      page: Number(params?.page),
      limit: Number(params?.limit),
      where: { deleted: false },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id: +id });
  }
}
