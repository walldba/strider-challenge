import { Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { HomeController } from './controllers/home.controller';
import { HomeService } from './services/home.service';

@Module({
  imports: [PostModule],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
