import { Controller, Get, Put, Post, Delete, Query, Param, Body } from '@nestjs/common';
import { HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { AddUserPostDto } from './dtos/add.dto';
import { UpdateUserPostDto } from './dtos/update.dto';
import { FetchUserPostConditionsDto } from './dtos/fethc-conditions.dto';
import { FetchUserPostQueriesDto } from './dtos/fethc-queries.dto';

import { UserPostService } from './user-posts.service'; 
import { storage, storagePath } from 'src/utils/storage';

@ApiTags('user-posts')
@Controller('users/:userid/posts')
export class UserPostsController {

  constructor(private userPostService: UserPostService) {}
  
  // add user post
  @Put()
  @UseInterceptors(
    FileInterceptor('photo', {
      dest: storagePath,
      storage: storage
    })
  )
  @HttpCode(201)
  async create(
    @Param('userid') userid: number,
    @UploadedFile() photo: Express.Multer.File,
    @Body() addPostDto: AddUserPostDto
  ) {
    try {

      addPostDto.userid = Number(userid);
      addPostDto.photo = photo.path;

      await this.userPostService.create(addPostDto);

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // update user post
  @Post(':id')
  @UseInterceptors(
    FileInterceptor('photo', {
      dest: storagePath,
      storage: storage
    })
  )
  @HttpCode(200)
  async update(
    @Param('userid') userid: number,
    @Param('id') id: number,
    @UploadedFile() photo: Express.Multer.File,
    @Body() updatePostDto: UpdateUserPostDto
  ) {
    try {

      if (photo)
        updatePostDto.photo = photo.path;

      await this.userPostService.update(
        Number(userid),
        Number(id),
        updatePostDto
      );

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // delete user post
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('userid') userid: number,
    @Param('id') id: number,
  ) {
    try {

      await this.userPostService.delete(
        Number(userid),
        Number(id),
      );

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get one user post
  @Get(':id')
  @HttpCode(200)
  async findOne(
    @Param('userid') userid: number,
    @Param('id') id: number,
  ) {
    try {

      return await this.userPostService.findOne(
        Number(userid),
        Number(id),
      );

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // fetch user posts
  @Get()
  @HttpCode(200)
  async findAll(
    @Param('userid') userid: number,
    @Query() queries: FetchUserPostQueriesDto & FetchUserPostConditionsDto,
  ) {
    try {

      const page = Number(queries.page ?? 1);
      const take = Number(queries.limit ?? 10);
      const skip = (page - 1) * take;
      const conditions = {
        name: queries.name,
        caption: queries.caption,
        tags: queries.tags,
      }

      const userPostTotal = await this.userPostService.count(Number(userid), conditions);
      const totalPages = Math.ceil(Number(userPostTotal) / take);

      const userPost = await this.userPostService.findAll(
        take,
        skip,
        Number(userid),
        conditions
      );

      return {
        curr_page: page,
        total_page: totalPages,
        data: userPost
      }

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

}