import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { IPost } from '../interfaces/post-entity.interface';
import { IPostService } from '../interfaces/post-service.interface';
import { PostRepository } from '../repository/post.repository';

@Injectable()
export class PostService implements IPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async find(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  async create(post: IPost): Promise<Post> {
    return await this.postRepository.createPost(post);
  }
}
