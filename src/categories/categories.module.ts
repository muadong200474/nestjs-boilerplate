import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriesAdminController } from './categories.admin.controller';

@Module({
  controllers: [CategoriesController, CategoriesAdminController],
  providers: [CategoriesService],
  imports: [PrismaModule],
})
export class CategoriesModule {}
