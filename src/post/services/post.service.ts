import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '../../shared/interfaces/pagination.interface';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { PostLimitFilterResquestDto } from '../dto/post-limit-request.dto';
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

  async findUserPosts(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResponse<Post[]>> {
    return await this.postRepository.findUserPosts(userId, pagination);
  }

  async create(post: IPost): Promise<Post> {
    return await this.postRepository.createPost(post);
  }
}
