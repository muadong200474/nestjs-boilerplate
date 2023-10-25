import { PartialType } from '@nestjs/swagger';
import { CreateCagetoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCagetoryDto) {}
