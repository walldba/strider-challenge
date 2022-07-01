import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserMock } from '../tests/mocks/user.mock';

const user = UserMock.getUserMock();
const postsPeerDayMock = faker.random.numeric();

describe('User Repository tests', () => {
  let userRepository: UserRepository;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user),
            query: jest.fn().mockResolvedValue([{ total: postsPeerDayMock }]),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<User>>(getRepositoryToken(User));
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should find user by Id', async () => {
    const userId = randomUUID();

    const res = await userRepository.findById(userId);
    expect(res).toEqual(user);
    expect(repository.findOne).toHaveBeenCalledWith(userId, {
      relations: ['posts'],
    });
  });

  it('should find the number of user posts peer day', async () => {
    const userId = randomUUID();
    const res = await userRepository.findPostsPerDay(userId);

    expect(res).toEqual(Number(postsPeerDayMock));
    expect(typeof res).toBe('number');
    expect(repository.query).toHaveBeenCalled();
  });
});
