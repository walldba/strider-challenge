import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
})
export class PostModule {}
