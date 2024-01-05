import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FetchPostConditionsDto {
  @ApiProperty({required: false})
  @IsOptional()
  name?: string;

  @ApiProperty({required: false})
  @IsOptional()
  caption?: string;

  @ApiProperty({required: false})
  @IsOptional()
  tags?: string;
}