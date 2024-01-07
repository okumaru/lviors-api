import { Controller, Get, Put, Post, Delete, Query, Param, Body } from '@nestjs/common';
import { HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FetchPostConditionsDto } from './dtos/fethc-conditions.dto';
import { FetchPostQueriesDto } from './dtos/fethc-queries.dto';

import { PostService } from './post.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {

  constructor(private postService: PostService) {}

  // Like post
  @Post(':id/like')
  @HttpCode(200)
  async like(@Param('id') id: number) {
    try {

      await this.postService.like(Number(id));

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Dislike post
  @Post(':id/dislike')
  @HttpCode(200)
  async dislike(@Param('id') id: number) {
    try {

      await this.postService.dislike(Number(id));

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
  async findOne(@Param('id') id: number) {
    try {

      return await this.postService.findOne(Number(id));

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Search post
  @Get()
  @HttpCode(200)
  async findAll(
    @Query() queries: FetchPostQueriesDto & FetchPostConditionsDto,
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

      const userPostTotal = await this.postService.count(conditions);
      const totalPages = Math.ceil(Number(userPostTotal) / take);

      const posts = await this.postService.findAll(
        take,
        skip,
        conditions
      );

      return {
        curr_page: page,
        total_page: totalPages,
        data: posts
      }

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

