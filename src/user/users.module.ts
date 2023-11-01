import { Module } from '@nestjs/common';
import { UsersAdminController } from './users.admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UsersAdminController],
  providers: [],
  imports: [PrismaModule],
})
export class UsersModule {}
