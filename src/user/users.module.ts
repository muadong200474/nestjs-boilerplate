import { Module } from '@nestjs/common';
import { UsersAdminController } from './users.admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersAdminController],
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
