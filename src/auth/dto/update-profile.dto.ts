import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
