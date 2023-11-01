import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { booleanTransformer } from 'src/common/transformers/boolean.transformer';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @Transform(booleanTransformer)
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  @ApiProperty()
  authorId: number;
}
