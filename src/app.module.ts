import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { PostsModule } from './post/post.module';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
