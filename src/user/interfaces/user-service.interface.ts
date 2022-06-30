import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { Post } from '../../post/entities/post.entity';
import { PaginationOptions } from '../../shared/interfaces/pagination.interface';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { User } from '../entities/user.entity';

export interface IUserService {
  findById(id: string): Promise<User>;

  findPosts(
    userId: string,
    pagination: PaginationOptions,
  ): Promise<PaginatedResponse<Post[]>>;

  createPost(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Promise<Post>;
}
