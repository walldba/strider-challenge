import { Post } from '../entities/post.entity';
import { IPost } from './post-entity.interface';

export interface IPostService {
  findById(id: string): Promise<Post>;
  create(post: IPost): Promise<Post>;
}
