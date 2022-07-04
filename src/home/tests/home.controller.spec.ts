import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PostTypeEnum } from '../../post/enums/post-type.enum';
import { PostMock } from '../../post/tests/mocks/post.mock';
import { HomeController } from '../controllers/home.controller';
import { HomeService } from '../services/home.service';
import { HomeMock } from '../tests/mocks/home.mock';

const posts = PostMock.getArrayPost({ min: 1, max: 10 });
const post = PostMock.getPost(PostTypeEnum.ORIGINAL);

describe('Home Controller tests', () => {
  let controller: HomeController;
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [
        {
          provide: HomeService,
          useValue: {
            findPosts: jest.fn(() => Promise.resolve(posts)),
            createPost: jest.fn(() => Promise.resolve(post)),
          },
        },
      ],
    }).compile();

    controller = module.get<HomeController>(HomeController);
    service = module.get<HomeService>(HomeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should find posts', async () => {
    const homeFindRequestMock = HomeMock.getHomeFindRequestMock();
    const paginationMock = HomeMock.getPaginationMock();

    const res = await controller.findPosts(homeFindRequestMock, paginationMock);
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
