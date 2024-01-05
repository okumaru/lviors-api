import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FetchUserConditionsDto {
  @ApiProperty({required: false})
  @IsOptional()
  name?: string;

  @ApiProperty({required: false})
  @IsOptional()
  username?: string;

  @ApiProperty({required: false})
  @IsOptional()
  email?: string;
}