import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({required: true})
  token: string;
}