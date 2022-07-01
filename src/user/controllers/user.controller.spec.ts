import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PostTypeEnum } from '../../post/enums/post-type.enum';
import { PostMock } from '../../post/tests/mocks/post.mock';
import { UserService } from '../services/user.service';
import { UserMock } from '../tests/mocks/user.mock';
import { UserController } from './user.controller';

const user = UserMock.getUserMock();
const posts = PostMock.getArrayPost({ min: 1, max: 10 });
const post = PostMock.getPost(PostTypeEnum.ORIGINAL);

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(() => Promise.resolve(user)),
            findPosts: jest.fn(() => Promise.resolve(posts)),
            createPost: jest.fn(() => Promise.resolve(post)),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should find user by Id', async () => {
    const userId = randomUUID();

    const res = await controller.findById(userId);
    expect(res).toEqual(user);
  });

  it('should find posts', async () => {
    const userId = randomUUID();
    const userLimitFilterResquestMock =
      UserMock.getUserLimitFilterResquestMock();

    const res = await controller.findPosts(userId, userLimitFilterResquestMock);
    expect(res).toEqual(posts);
  });

  it('should create post', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.ORIGINAL,
    );

    const res = await controller.createPost(userId, postCreateRequesMock);
    expect(res).toEqual(post);
  });
});
