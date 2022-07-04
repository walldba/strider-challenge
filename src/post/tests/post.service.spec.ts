import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PostTypeEnum } from '../enums/post-type.enum';
import { PostService } from '../services/post.service';
import { PostMock } from './mocks/post.mock';
import { PostRepository } from '../repository/post.repository';

const post = PostMock.getPost(PostTypeEnum.ORIGINAL);
const posts = PostMock.getArrayPost({ min: 1, max: 10 });

describe('Post Service tests', () => {
  let service: PostService;
  let postRepository: PostRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue(post),
            findWithFilters: jest.fn().mockResolvedValue(posts),
            findUserPosts: jest.fn().mockResolvedValue(posts),
            createPost: jest.fn().mockResolvedValue(post),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(postRepository).toBeDefined();
  });

  it('should find post by Id', async () => {
    const postId = randomUUID();

    const res = await service.findById(postId);
    expect(res).toEqual(post);
    expect(postRepository.findById).toHaveBeenCalledWith(postId);
  });

  it('should find post with filters', async () => {
    const paginationMock = PostMock.getPaginationMock();

    const res = await service.findWithFilters(paginationMock);
    expect(res).toEqual(posts);
    expect(postRepository.findWithFilters).toHaveBeenCalled();
  });

  it('should find user posts', async () => {
    const userId = randomUUID();
    const paginationMock = PostMock.getPaginationMock();

    const res = await service.findUserPosts(userId, { ...paginationMock });
    expect(res).toEqual(posts);
    expect(postRepository.findUserPosts).toHaveBeenCalled();
  });

  it('should create post', async () => {
    const res = await service.create(post);
    expect(res).toEqual(post);
    expect(postRepository.createPost).toHaveBeenCalled();
  });
});
