import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PaginationOptions } from '../../shared/interfaces/pagination.interface';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { Post } from '../entities/post.entity';
import { IPost } from '../interfaces/post-entity.interface';
import { PostFilterOptions } from '../interfaces/post-filter.interface';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    super();
  }

  async findById(id: string): Promise<Post> {
    return await this.postRepository.findOne(id);
  }

  async findWithFilters(
    filter: PostFilterOptions,
  ): Promise<PaginatedResponse<Post[]>> {
    const [posts, count] = await this.postRepository.findAndCount({
      where: {
        createdAt: Between(
          filter.startDate || new Date(),
          filter.endDate || new Date(),
        ),
      },
      skip: filter.skip || 0,
      take: filter.take || 10,
      order: { createdAt: 'DESC' },
    });
    return {
      data: posts,
      meta: {
        ...filter,
        count,
      },
    };
  }

  async findUserPosts(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResponse<Post[]>> {
    const [posts, count] = await this.postRepository.findAndCount({
      where: { user: userId },
      skip: pagination.skip,
      take: pagination.take,
      order: { createdAt: 'DESC' },
    });

    return {
      data: posts,
      meta: {
        ...pagination,
        count,
      },
    };
  }

  async createPost(post: IPost): Promise<Post> {
    return await this.postRepository.save(post);
  }
}
