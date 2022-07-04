import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PostTypeEnum } from '../../post/enums/post-type.enum';
import { PostService } from '../../post/services/post.service';
import { PostMock } from '../../post/tests/mocks/post.mock';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../services/user.service';
import { UserMock } from '../tests/mocks/user.mock';

const user = UserMock.getUserMock();
const posts = PostMock.getArrayPost({ min: 5, max: 10 });
const post = PostMock.getPost(PostTypeEnum.ORIGINAL);

describe('User Service tests', () => {
  let service: UserService;
  let postService: PostService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PostService,
          useValue: {
            findUserPosts: jest.fn(() => Promise.resolve(posts)),
            findById: jest.fn(() => Promise.resolve(post)),
            create: jest.fn(() => Promise.resolve(post)),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue(user),
            findPostsPerDay: jest.fn().mockResolvedValue(0),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(postService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should find user by Id', async () => {
    const userId = randomUUID();

    const res = await service.findById(userId);
    expect(res).toEqual(user);
    expect(userRepository.findById).toHaveBeenCalledWith(userId);
  });

  it('should find user posts', async () => {
    const userId = randomUUID();
    const userLimitFilterResquestMock =
      UserMock.getUserLimitFilterResquestMock();

    const res = await service.findPosts(userId, userLimitFilterResquestMock);
    expect(res).toEqual(posts);
    expect(postService.findUserPosts).toHaveBeenCalledWith(
      userId,
      userLimitFilterResquestMock,
    );
  });

  it('should create post', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.ORIGINAL,
    );

    const res = await service.createPost(userId, postCreateRequesMock);
    expect(res).toEqual(post);
    expect(userRepository.findPostsPerDay).toHaveBeenCalledWith(userId);
    expect(postService.create).toHaveBeenCalled();
  });

  it('should throw BadRequestException when try create post to user undefined', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.ORIGINAL,
    );

    jest.spyOn(userRepository, 'findById').mockResolvedValue(undefined);

    await expect(
      service.createPost(userId, postCreateRequesMock),
    ).rejects.toThrowError(new BadRequestException('User not found'));
    expect(userRepository.findById).toHaveBeenCalledWith(userId);
  });

  it('should throw BadRequestException when try create post to user with more than 5 posts', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.ORIGINAL,
    );

    jest.spyOn(userRepository, 'findPostsPerDay').mockResolvedValue(5);

    await expect(
      service.createPost(userId, postCreateRequesMock),
    ).rejects.toThrowError(
      new BadRequestException(
        "It's not possible to make more than 5 posts per day",
      ),
    );
    expect(userRepository.findPostsPerDay).toHaveBeenCalledWith(userId);
  });

  it('should throw BadRequestException when try create post with originalPost not found', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.ORIGINAL,
    );
    postCreateRequesMock.originalPostId = randomUUID();

    jest.spyOn(postService, 'findById').mockResolvedValue(undefined);

    await expect(
      service.createPost(userId, postCreateRequesMock),
    ).rejects.toThrowError(
      new BadRequestException('Was not possible to find Original Post'),
    );
    expect(userRepository.findPostsPerDay).toHaveBeenCalled();
    expect(postService.findById).toHaveBeenCalled();
  });

  it('should throw BadRequestException when try create repost to another repost', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.REPOST,
    );
    postCreateRequesMock.originalPostId = randomUUID();

    const post = PostMock.getPost(PostTypeEnum.REPOST);
    jest.spyOn(postService, 'findById').mockResolvedValue(post);

    await expect(
      service.createPost(userId, postCreateRequesMock),
    ).rejects.toThrowError(
      new BadRequestException(
        `It's not possible to make a Repost to another Repost`,
      ),
    );
    expect(userRepository.findPostsPerDay).toHaveBeenCalled();
    expect(postService.findById).toHaveBeenCalled();
  });

  it('should throw BadRequestException when try create quote to another quote', async () => {
    const userId = randomUUID();
    const postCreateRequesMock = PostMock.getPostCreateRequestMock(
      PostTypeEnum.QUOTE,
    );
    postCreateRequesMock.originalPostId = randomUUID();

    const post = PostMock.getPost(PostTypeEnum.QUOTE);
    jest.spyOn(postService, 'findById').mockResolvedValue(post);

    await expect(
      service.createPost(userId, postCreateRequesMock),
    ).rejects.toThrowError(
      new BadRequestException(
        `It's not possible to make a Quote to another Quote`,
      ),
    );
    expect(userRepository.findPostsPerDay).toHaveBeenCalled();
    expect(postService.findById).toHaveBeenCalled();
  });
});
