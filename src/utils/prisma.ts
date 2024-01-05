import { PrismaClient } from "@prisma/client";

export class DBClient {

  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

}