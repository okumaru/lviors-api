import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserPostsController } from './user-posts.controller';
import { UserPostService } from './user-posts.service';
// import { UsersController } from './user.controller';
// import { UserService } from './user.service';
// import { ExistUserMiddleware } from './middlewares/exist-user.middleware';

@Module({
  controllers: [UserPostsController],
  providers: [UserPostService],
  exports: [UserPostsModule]
})
export class UserPostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}