import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/common/transformers/lower-case.transformer';

export class LoginDto {
  @Transform(lowerCaseTransformer)
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
