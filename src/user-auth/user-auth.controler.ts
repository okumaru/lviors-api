import { Controller, Post, Body } from '@nestjs/common';
import { HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dtos/login.dto';
import { LogoutDto } from './dtos/logout.dto';

import { UserAuthService } from './user-auth.service';
import { randomStr } from 'src/utils/str-random';

const randomLen = 4;

@ApiTags('user-auth')
@Controller('auth')
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @Post('/login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    try {

      const user = await this.userAuthService.findUser(loginDto.username);
      if (user.password !== loginDto.password)
        throw new Error("Invalid username and password.")

      
      const randomOne = randomStr(randomLen);
      const randomTwo = randomStr(randomLen);

      return randomLen + randomOne + user.id + randomTwo;

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('/logout')
  @HttpCode(200)
  async logout(@Body() logoutDto: LogoutDto) {
    try {

      const token = logoutDto.token;
      const tokenStrLen = token.length;
      const userid = token.substring(randomLen + 1, tokenStrLen - randomLen)

      if (!userid)
        throw new Error("User not found!");

      const user = await this.userAuthService.findOne(Number(userid));
      if (!user)
        throw new Error("User not found!");

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

