import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { PostLimitFilterResquestDto } from '../dto/post-limit-request.dto';
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
  async findUserPosts(
    userId: string,
    limitFilterResquestDto: PostLimitFilterResquestDto,
  ): Promise<PaginatedResponse<Post[]>> {
    const [posts, count] = await this.postRepository.findAndCount({
      where: { user: userId },
      skip: limitFilterResquestDto.skip,
      take: limitFilterResquestDto.take,
      order: { createdAt: 'DESC' },
    });

    return {
      data: posts,
      meta: {
        ...limitFilterResquestDto,
        count,
      },
    };
  }

  async createPost(post: IPost): Promise<Post> {
    return await this.postRepository.save(post);
  }
}
