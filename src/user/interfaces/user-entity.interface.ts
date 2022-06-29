import { Post } from '../../post/entities/post.entity';

export interface IUser {
  username: string;

  posts: Post[];
}
