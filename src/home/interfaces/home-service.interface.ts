import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';
import { Post } from '../../post/entities/post.entity';
import { PaginationOptions } from '../../shared/interfaces/pagination.interface';
import { PaginatedResponse } from '../../shared/utils/pagination.util';
import { HomeFindRequestDto } from '../dto/home-find-request.dto';

export interface IHomeService {
  findPosts(
    homeFindRequestDto: HomeFindRequestDto,
    pagination: PaginationOptions,
  ): Promise<PaginatedResponse<Post[]>>;

  createPost(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Promise<Post>;
}
