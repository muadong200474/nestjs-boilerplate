import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number',
    default: 1,
  })
  page?: string;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
  })
  limit?: string;
}
