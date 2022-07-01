import { Injectable } from '@nestjs/common';
import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { Post } from '../../post/entities/post.entity';
import { PostService } from '../../post/services/post.service';
import { PaginationOptions } from '../../shared/interfaces/pagination.interface';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { UserService } from '../../user/services/user.service';
import { HomeFindRequestDto } from '../dto/home-find-request.dto';

@Injectable()
export class HomeService {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  async findPosts(
    homeFindResquestDto: HomeFindRequestDto,
    pagination: PaginationOptions,
  ): Promise<PaginatedResponse<Post[]>> {
    if (homeFindResquestDto.onlyMyPosts) {
      return await this.postService.findUserPosts(
        homeFindResquestDto.userId,
        pagination,
      );
    }

    return await this.postService.findWithFilters({
      ...homeFindResquestDto,
      ...pagination,
    });
  }

  async createPost(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Promise<Post> {
    return await this.userService.createPost(userId, postCreateRequestDto);
  }
}
