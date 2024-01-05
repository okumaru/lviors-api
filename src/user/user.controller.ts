import { Controller, Get, Put, Post, Delete, Query, Param, Body } from '@nestjs/common';
import { HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { RegisterUserDto } from './dtos/register.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { ChangePassUserDto } from './dtos/change-pass.dto';
import { FetchUserConditionsDto } from './dtos/fethc-conditions.dto';
import { FetchUserQueriesDto } from './dtos/fethc-queries.dto';

import { UserService } from './user.service';
import { storage, storagePath } from 'src/utils/storage';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UserService) {}

  // Register user
  @Put()
  @HttpCode(201)
  async create(@Body() RegisterUserDto: RegisterUserDto) {
    try {

      await this.usersService.create(RegisterUserDto);

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Update user
  @Post(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: number,
    @Body() UpdateUserDto: UpdateUserDto
  ) {
    try {

      await this.usersService.update(
        Number(id), 
        UpdateUserDto
      );

      return await this.usersService.findOne(Number(id));

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Update user password
  @Post(':id/change-password')
  @HttpCode(200)
  async changePass(
    @Param('id') id: string,
    @Body() ChangePassUserDto: ChangePassUserDto
  ) {
    try {

      const user = await this.usersService.findOne(Number(id));

      if (user.password !== ChangePassUserDto.old_pass)
        throw new Error("Your old password is wrong, please make sure input old password equal with your password.");

      if (ChangePassUserDto.new_pass !== ChangePassUserDto.conf_pass)
      throw new Error("Your new password is not equal with your confirmation password, aborting update password.");

      await this.usersService.updatePass(
        Number(id), 
        ChangePassUserDto.new_pass
      );

      return await this.usersService.findOne(Number(id));

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Change user photo
  @Post(':id/photo')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: storagePath,
      storage: storage
    })
  )
  async changePhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {

    await this.usersService.updatePhoto(
      Number(id), 
      file.path
    );

  }

  // Delete user
  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    try {

      await this.usersService.delete(Number(id));

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get one user
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    try {

      return await this.usersService.findOne(Number(id));

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get all users with filter
  @Get()
  @HttpCode(200)
  async findAll(
    @Query() queries: FetchUserQueriesDto,
    @Body() conditions: FetchUserConditionsDto
  ) {
    try {

      const take = Number(queries.limit ?? 10);
      const skip = (Number(queries.page ?? 1) - 1) * Number(queries.limit ?? 10);

      return await this.usersService.findAll(
        take,
        skip,
        conditions
      );

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

