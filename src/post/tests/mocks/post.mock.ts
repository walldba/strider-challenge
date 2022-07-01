import { faker } from '@faker-js/faker';
import { IPost } from '../../interfaces/post-entity.interface';
import { randomUUID } from 'crypto';
import { PostTypeEnum } from '../../enums/post-type.enum';
import { PostCreateRequestDto } from '../../dto/post-create-request.dto';
import { Post } from '../../entities/post.entity';
import { PostFilterOptions } from '../../interfaces/post-filter.interface';
import { PaginatedResponse } from '../../../shared/utils/pagination.util';

export class PostMock {
  static getPost(type: PostTypeEnum): Post {
    return {
      id: randomUUID(),
      createdAt: faker.date.recent(),
      user: {
        id: randomUUID(),
        posts: [],
        username: faker.internet.userName(),
        createdAt: faker.date.soon(),
        toJSON() {
          return {
            username: this.username,
            joinedAt: this.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            posts: this.posts.length,
          };
        },
      },
      type,
      content: faker.random.words(10),
    };
  }

  static getPaginatedPosts(
    posts: Post[],
    filters: PostFilterOptions,
  ): PaginatedResponse<Post[]> {
    return {
      data: posts,
      meta: {
        ...filters,
        count: posts.length,
      },
    };
  }

  static getArrayPost({ min, max }: { min: number; max: number }): Post[] {
    return Array.from(
      { length: +faker.finance.amount(min, max, 0) },
      this.getPost,
    );
  }

  static getPostCreateRequestMock(type: PostTypeEnum): PostCreateRequestDto {
    return { content: faker.random.words(10), type };
  }

  static getPaginationMock(): PostFilterOptions {
    return {
      startDate: faker.date.past().toLocaleDateString(),
      endDate: faker.date.past().toLocaleDateString(),
      onlyMyPosts: false,
      userId: randomUUID(),
      skip: 0,
      take: 10,
    };
  }
}
