import { Injectable } from '@nestjs/common';
import { tblposts } from "@prisma/client";
import { AddUserPostDto } from './dtos/add.dto';
import { UpdateUserPostDto } from './dtos/update.dto';
import { FetchUserPostConditionsDto } from './dtos/fethc-conditions.dto';
import { DBClient } from 'src/utils/prisma';

@Injectable()
export class UserPostService extends DBClient {

  async create(post: AddUserPostDto) {
    await this.prisma.tblposts.create({
      data: {
        name: post.name,
        caption: post.caption,
        tags: post.tags,
        photo: post.photo,
        userid: post.userid
      },
    });
  }

  async update(
    userid: number, 
    id: number, 
    post: UpdateUserPostDto
  ) {
    await this.prisma.tblposts.update({
      where: { id, userid },
      data: {
        name: post.name,
        caption: post.caption,
        tags: post.tags,
        photo: post.photo,
      },
    });
  }

  async delete(
    userid: number, 
    id: number
  ) {
    await this.prisma.tblposts.delete({
      where: { id, userid },
    });
  }

  async findOne( 
    userid: number, 
    id: number
  ): Promise<tblposts | undefined> {
    return await this.prisma.tblposts.findUnique({
      where: { id, userid }
    })
  }

  async findAll( 
    take: number,
    skip: number, 
    conditions?: FetchUserPostConditionsDto,
  ): Promise<tblposts[] | undefined> {
    return await this.prisma.tblposts.findMany({
      skip: skip,
      take: take,
      where: {
        name: conditions?.name,
        caption: conditions?.caption,
        tags: conditions?.tags ? {
          contains: conditions?.tags
        } : undefined
      }
    })
  }
}