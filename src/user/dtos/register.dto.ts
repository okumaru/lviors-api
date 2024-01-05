import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({required: true})
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  password: string;

  photo: string;
}