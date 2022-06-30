import { Injectable } from '@nestjs/common';
import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { Post } from '../../post/entities/post.entity';
import { PostService } from '../../post/services/post.service';
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

  async createPost(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Promise<Post> {
    const post = PostCreateRequestDto.toEntity(userId, postCreateRequestDto);

    return await this.postService.create(post);
  }
}
