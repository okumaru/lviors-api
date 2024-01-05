import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({required: false})
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

}