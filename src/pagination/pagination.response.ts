import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MetadataResponse {
  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly currentPage: number;

  @ApiProperty()
  readonly totalPages: number;

  @ApiProperty()
  readonly totalCount: number;

  @ApiProperty()
  readonly hasNextPage: boolean;
}

export class PaginationResponse<T> {
  @ApiProperty({ type: [Object] })
  @Type(() => Object)
  readonly data: T;

  @ApiProperty({ type: [Object] })
  @Type(() => Object)
  readonly metadata: MetadataResponse;
}
