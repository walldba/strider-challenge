import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PostTypeEnum } from '../../post/enums/post-type.enum';
import { PostService } from '../../post/services/post.service';
import { PostMock } from '../../post/tests/mocks/post.mock';
import { UserService } from '../../user/services/user.service';
import { HomeMock } from './mocks/home.mock';
import { HomeService } from '../services/home.service';

const posts = PostMock.getArrayPost({ min: 1, max: 10 });
const post = PostMock.getPost(PostTypeEnum.ORIGINAL);

describe('Home Service tests', () => {
  let service: HomeService;
  let postService: PostService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: PostService,
          useValue: {
            findUserPosts: jest.fn(() => Promise.resolve(posts)),
            findWithFilters: jest.fn(() => Promise.resolve(posts)),
          },
        },
        {
          provide: UserService,
          useValue: { createPost: jest.fn(() => Promise.resolve(post)) },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
    postService = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(postService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should find posts', async () => {
    const homeFindRequestMock = HomeMock.getHomeFindRequestMock();
    const paginationMock = HomeMock.getPaginationMock();

    const res = await service.findPosts(homeFindRequestMock, paginationMock);
    expect(res).toEqual(posts);
  });

  it('should find only user posts', async () => {
    const homeFindRequestMock = HomeMock.getHomeFindRequestMock();
    const paginationMock = HomeMock.getPaginationMock();

    homeFindRequestMock.onlyMyPosts = true;

    const res = await service.findPosts(homeFindRequestMock, paginationMock);
    expect(res).toEqual(posts);
  });

  it('should create post', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.ORIGINAL,
    );

    const res = await service.createPost(userId, postCreateRequesMock);
    expect(res).toEqual(post);
  });
});
