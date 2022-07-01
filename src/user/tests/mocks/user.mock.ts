import { faker } from '@faker-js/faker';
import { PostTypeEnum } from '../../../post/enums/post-type.enum';
import { PostMock } from '../../../post/tests/mocks/post.mock';
import { UserLimitFilterResquestDto } from '../../dto/user-limit-request.dto';
import { IUser } from '../../interfaces/user-entity.interface';

export class UserMock {
  static getUserMock(): IUser {
    return {
      posts: [],
      username: faker.internet.userName(),
    };
  }

  static getUserLimitFilterResquestMock(): UserLimitFilterResquestDto {
    return {
      skip: 0,
      take: 5,
    };
  }
}
