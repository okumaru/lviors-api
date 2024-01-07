import { Injectable } from '@nestjs/common';
import { tblposts } from "@prisma/client";
import { FetchPostConditionsDto } from './dtos/fethc-conditions.dto';
import { DBClient } from 'src/utils/prisma';

@Injectable()
export class PostService extends DBClient {

  async like(id: number) {
    await this.prisma.tblposts.update({
      where: { id },
      data: {
        likes: { increment: 1 },
      },
    });
  }

  async dislike(id: number) {
    await this.prisma.tblposts.update({
      where: { id },
      data: {
        likes: { decrement: 1 },
      },
    });
  }

  async findOne( 
    id: number
  ): Promise<tblposts | undefined> {
    return await this.prisma.tblposts.findUnique({
      where: { id }
    })
  }

  async count(conditions?: FetchPostConditionsDto): Promise<Number>  {
    const posts = await this.prisma.tblposts.findMany({
      where: {
        name: conditions?.name,
        caption: conditions?.caption,
        tags: conditions?.tags ? {
          contains: conditions?.tags
        } : undefined
      }
    });

    return posts.length;
  }

  async findAll( 
    take: number,
    skip: number, 
    conditions?: FetchPostConditionsDto,
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
