import { User } from '../../user/entities/user.entity';
import { PostTypeEnum } from '../enums/post-type.enum';

export interface IPost {
  content?: string | undefined;

  type: PostTypeEnum;

  user: Partial<User>;

  originalPostId?: string | undefined;
}
