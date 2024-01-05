import { Injectable } from '@nestjs/common';
import { tblusers } from "@prisma/client";
import { RegisterUserDto } from './dtos/register.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { FetchUserConditionsDto } from './dtos/fethc-conditions.dto';
import { DBClient } from 'src/utils/prisma';

@Injectable()
export class UserService extends DBClient {

  async create(user: RegisterUserDto) {
    await this.prisma.tblusers.create({
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password
      },
    });
  }

  async update(
    id: number, 
    user: UpdateUserDto
  ) {
    await this.prisma.tblusers.update({
      where: { id },
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
      }
    })
  }

  async updatePass(
    id: number, 
    password: string
  ) {
    await this.prisma.tblusers.update({
      where: { id },
      data: { password: password }
    })
  }

  async updatePhoto(
    id: number, 
    photo: string
  ) {
    await this.prisma.tblusers.update({
      where: { id },
      data: { photo: photo }
    })
  }

  async delete(id: number) {
    return await this.prisma.tblusers.delete({
      where: { id }
    })
  }

  async findOne( id: number ): Promise<tblusers | undefined> {
    return await this.prisma.tblusers.findUnique({
      where: { id }
    })
  }

  async findAll( 
    take: number,
    skip: number, 
    conditions?: FetchUserConditionsDto,
  ): Promise<tblusers[] | undefined> {
    return await this.prisma.tblusers.findMany({
      skip: skip,
      take: take,
      where: {
        name: conditions?.name,
        username: conditions?.username,
        email: conditions?.email
      }
    })
  }
}
