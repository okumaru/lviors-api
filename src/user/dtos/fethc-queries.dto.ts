import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FetchUserQueriesDto {
  @ApiProperty({required: false})
  @IsOptional()
  page?: string;

  @ApiProperty({required: false})
  @IsOptional()
  limit?: string;

  @ApiProperty({required: false})
  @IsOptional()
  offset?: string;
}