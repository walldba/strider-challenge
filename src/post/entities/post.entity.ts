import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';
import { User } from '../../user/entities/user.entity';
import { PostTypeEnum } from '../enums/post-type.enum';
import { IPost } from '../interfaces/post.interface';

@Entity({ name: 'posts' })
export class Post extends BaseEntity implements IPost {
  @Column({ type: 'varchar', length: 777 })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: 'enum', enum: PostTypeEnum, default: PostTypeEnum.ORIGINAL })
  type: PostTypeEnum;

  @Column('uuid', { nullable: true })
  originalPostId?: string;

  constructor(data: IPost) {
    super();
    Object.assign(this, data);
  }
}
