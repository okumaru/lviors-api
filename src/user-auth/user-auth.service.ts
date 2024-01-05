import { Injectable } from '@nestjs/common';
import { PrismaClient, tblusers } from "@prisma/client";
import { LoginDto } from './dtos/login.dto';
import { DBClient } from 'src/utils/prisma';

@Injectable()
export class UserAuthService extends DBClient {
  async findUser(username: string) {
    return this.prisma.tblusers.findFirst({
      where: { username }
    })
  }

  async findOne( id: number ): Promise<tblusers | undefined> {
    return await this.prisma.tblusers.findUnique({
      where: { id }
    })
  }
}
