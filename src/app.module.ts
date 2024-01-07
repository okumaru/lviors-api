import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { PostsModule } from './post/post.module';
import { join } from 'path';

@Module({
  imports: [
    UsersModule, 
    PostsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tmp/uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
