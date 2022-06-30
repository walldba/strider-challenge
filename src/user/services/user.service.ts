import { Injectable } from '@nestjs/common';
import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { PostLimitFilterResquestDto } from '../../post/dto/post-limit-request.dto';
import { Post } from '../../post/entities/post.entity';
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

    return await this.postService.create(post);
  }
}
