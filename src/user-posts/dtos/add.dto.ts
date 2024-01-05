import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class AddUserPostDto {
  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  name: string;

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

  userid: number;
}