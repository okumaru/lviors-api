import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserPostDto {
  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  caption?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  tags?: string;

  @ApiProperty({type: "file", required: false})
  @IsOptional()
  photo?: string;
}