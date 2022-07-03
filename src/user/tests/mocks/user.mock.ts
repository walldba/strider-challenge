import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { UserLimitFilterResquestDto } from '../../dto/user-limit-request.dto';
import { User } from '../../entities/user.entity';

export class UserMock {
  static getUserMock(): User {
    return {
      id: randomUUID(),
      createdAt: faker.date.recent(),
      posts: [],
      username: faker.name.firstName(),
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
      },
    };
  }

  static getUserLimitFilterResquestMock(): UserLimitFilterResquestDto {
    return {
      skip: 0,
      take: 5,
    };
  }
}
