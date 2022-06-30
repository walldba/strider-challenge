import { BadRequestException, Injectable } from '@nestjs/common';
import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { Post } from '../../post/entities/post.entity';
import { PostTypeEnum } from '../../post/enums/post-type.enum';
import { PostService } from '../../post/services/post.service';
import { PaginationOptions } from '../../shared/interfaces/pagination.interface';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { User } from '../entities/user.entity';
import { IUserService } from '../interfaces/user-service.interface';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly postService: PostService,
  ) {}

  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async findPosts(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResponse<Post[]>> {
    return await this.postService.findUserPosts(userId, pagination);
  }

  async createPost(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Promise<Post> {
    const post = PostCreateRequestDto.toEntity(userId, postCreateRequestDto);

    const sentPosts = await this.userRepository.findPostsPerDay(userId);

    if (sentPosts > 5) {
      throw new BadRequestException({
        message: `It's not possible to make more than 5 posts per day`,
        userId,
        sentPosts,
      });
    }

    if (postCreateRequestDto.originalPostId) {
      const originalPost = await this.postService.findById(
        postCreateRequestDto.originalPostId,
      );

      if (!originalPost) {
        throw new BadRequestException({
          message: `Was not possible to find Original Post`,
          originalPostId: postCreateRequestDto.originalPostId,
        });
      }

      const isRepost = [PostTypeEnum.REPOST].includes(postCreateRequestDto.type);
      if (isRepost) this.handleRepost(postCreateRequestDto, originalPost);

      const isQuote = [PostTypeEnum.QUOTE].includes(postCreateRequestDto.type);
      if (isQuote) this.handleQuote(postCreateRequestDto, originalPost);
    }

    return await this.postService.create(post);
  }

  private handleRepost(
    postCreateRequestDto: PostCreateRequestDto,
    originalPost: Post,
  ) {
    const canMakeRepost = [PostTypeEnum.QUOTE, PostTypeEnum.ORIGINAL].includes(
      originalPost.type,
    );

    if (!canMakeRepost) {
      throw new BadRequestException({
        message: `It's not possible to make a Repost to another Repost`,
        originalPost,
        repostRequest: postCreateRequestDto,
      });
    }
  }

  private handleQuote(
    postCreateRequestDto: PostCreateRequestDto,
    originalPost: Post,
  ) {
    const canMakeQuote = [PostTypeEnum.REPOST, PostTypeEnum.ORIGINAL].includes(
      originalPost.type,
    );

    if (!canMakeQuote) {
      throw new BadRequestException({
        message: `It's not possible to make a Quote to another Quote`,
        originalPost,
        quoteRequest: postCreateRequestDto,
      });
    }
  }
}
