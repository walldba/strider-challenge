import { User } from '../../user/entities/user.entity';
import { PostTypeEnum } from '../enums/post-type.enum';

export interface IPost {
  content: string;

  user: User;

  type: PostTypeEnum;

  originalPostId?: string | undefined;
}
