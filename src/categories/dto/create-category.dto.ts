import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCagetoryDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
