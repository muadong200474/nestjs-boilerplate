import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { booleanTransformer } from 'src/common/transformers/boolean.transformer';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ required: false, default: false })
  @Transform(booleanTransformer)
  published?: boolean = false;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber({ allowNaN: false })
  authorId: number;
}
