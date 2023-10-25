import { ApiProperty } from '@nestjs/swagger';

export class CreateCagetoryDto {
  @ApiProperty()
  name: string;
}
