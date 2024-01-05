import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ChangePassUserDto {
  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  old_pass: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  new_pass: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  conf_pass: string;
}