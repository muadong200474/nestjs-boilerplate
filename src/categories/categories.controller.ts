import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('api/v1/user/categories')
@ApiTags('User-Categories')
@Roles(Role.USER)
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll({ where: { deleted: false } });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id: +id });
  }
}
