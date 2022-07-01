import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '../../shared/interfaces/pagination.interface';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { Post } from '../entities/post.entity';
import { IPost } from '../interfaces/post-entity.interface';
import { PostFilterOptions } from '../interfaces/post-filter.interface';
import { IPostService } from '../interfaces/post-service.interface';
import { PostRepository } from '../repository/post.repository';

@Injectable()
export class PostService implements IPostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findById(id: string): Promise<Post> {
    return await this.postRepository.findById(id);
  }

  async findWithFilters(
    filter: PostFilterOptions,
  ): Promise<PaginatedResponse<Post[]>> {
    return await this.postRepository.findWithFilters(filter);
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
