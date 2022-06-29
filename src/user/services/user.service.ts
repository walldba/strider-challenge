import { Injectable } from '@nestjs/common';
import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { Post } from '../../post/entities/post.entity';
import { PostService } from '../../post/services/post.service';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly postService: PostService) {}

  async createPost(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Promise<Post> {
    const post = PostCreateRequestDto.toEntity(userId, postCreateRequestDto);

    return await this.postService.create(post);
  }
}
