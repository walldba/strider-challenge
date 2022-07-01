import { UserMock } from './mocks/user.mock';
import { User } from '../entities/user.entity';

describe('User Entity tests', () => {
  let userEntity: User;

  beforeEach(() => {
    const user = UserMock.getUserMock();
    userEntity = new User(user);
  });

  it('should be defined', () => {
    expect(userEntity).toBeDefined();
  });

  it('should return a handled user entity', () => {
    const userEntityHandled = userEntity.toJSON();
    const userHandled = userEntity.toJSON();

    expect(userEntityHandled).toEqual(userHandled);
  });
});
