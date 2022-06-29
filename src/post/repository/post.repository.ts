import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { IPost } from '../interfaces/post-entity.interface';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    super();
  }
  async createPost(post: IPost): Promise<Post> {
    return await this.postRepository.save(post);
  }
}
