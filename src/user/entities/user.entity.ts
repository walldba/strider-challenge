import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { BaseEntity } from '../../shared/base.entity';
import { IUser } from '../interfaces/user-entity.interface';

@Entity({ name: 'users' })
export class User extends BaseEntity implements IUser {
  @Column({ type: 'varchar', length: '14', unique: true })
  username: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  toJSON() {
    return {
      username: this.username,
      joinedAt: this.createdAt.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      posts: this.posts.length,
    };
  }
}
