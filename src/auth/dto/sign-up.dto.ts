import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { lowerCaseTransformer } from 'src/common/transformers/lower-case.transformer';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
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

  @IsNotEmpty()
  @Match('password', { message: 'Confirmation password not match' })
  @ApiProperty()
  passwordConfirmation: string;
}
