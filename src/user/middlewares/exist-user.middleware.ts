
import { Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';

@Injectable()
export class ExistUserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {

      const userid = Number(req.params.id);
      const userService = new UserService();
      const user = await userService.findOne(userid);

      if (!user)
        throw new Error("User not found!");

      next();

    } catch (e) {
      throw new HttpException(
        e.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    
  }
}
