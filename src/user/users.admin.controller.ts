import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { PaginationDto } from 'src/pagination/pagination.dto';

@Controller('api/v1/admin/users')
@ApiTags('Admin-Users')
@Roles(Role.ADMIN)
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class UsersAdminController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(@Query() params: PaginationDto) {
    return this.userService.findAll({
      page: Number(params?.page),
      limit: Number(params?.limit),
      where: { deleted: false },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: +id });
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
}
