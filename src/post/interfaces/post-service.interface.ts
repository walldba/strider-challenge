import { Post } from '../entities/post.entity';
import { IPost } from './post-entity.interface';

export interface IPostService {
  find(): Promise<Post[]>;
  create(post: IPost): Promise<Post>;
}
