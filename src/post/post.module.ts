import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PostsController } from './post.controller';
import { PostService } from './post.service';

@Module({
  controllers: [PostsController],
  providers: [PostService],
  exports: [PostsModule]
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}