import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostRepository } from './repository/post.repository';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostRepository],
  exports: [PostService],
})
export class PostModule {}
