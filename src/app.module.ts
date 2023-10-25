import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './common/config/auth.config';
import mailConfig from './common/config/mail.config';

@Module({
  imports: [
    PostsModule,
    CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig, mailConfig],
      envFilePath: ['.env'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
