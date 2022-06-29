import { PostCreateRequestDto } from '../../post/dto/post-create-request.dto';

export interface IUserService {
  createPost(
    userId: string,
    postCreateRequestDto: PostCreateRequestDto,
  ): Promise<any>;
}
