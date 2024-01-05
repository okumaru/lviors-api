import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserPostsModule } from '../user-posts/user-posts.module';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { ExistUserMiddleware } from './middlewares/exist-user.middleware';

@Module({
  imports: [UserAuthModule, UserPostsModule],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UsersModule]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExistUserMiddleware)
      .forRoutes('users/:id');
  }
}