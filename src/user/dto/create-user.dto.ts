import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';
import { lowerCaseTransformer } from 'src/common/transformers/lower-case.transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password contains at least 1 upper case letter, 1 lower case letter, 1 number or special character',
  })
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @ApiProperty({ default: Role.USER })
  role: Role;
}
