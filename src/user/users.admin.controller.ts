import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1/admin/users')
export class UsersAdminController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll({});
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
