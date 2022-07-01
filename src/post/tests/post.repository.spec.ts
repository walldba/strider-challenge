import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { PostTypeEnum } from '../enums/post-type.enum';
import { PostRepository } from '../repository/post.repository';
import { PostMock } from '../tests/mocks/post.mock';

const post = PostMock.getPost(PostTypeEnum.ORIGINAL);
const posts = PostMock.getArrayPost({ min: 0, max: 10 });

describe('Post Repository tests', () => {
  let postRepository: PostRepository;
  let repository: Repository<Post>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostRepository,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            findOne: jest.fn().mockResolvedValue(post),
            findAndCount: jest.fn().mockResolvedValue([posts, posts.length]),
            save: jest.fn().mockResolvedValue(post),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
    postRepository = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(postRepository).toBeDefined();
  });

  it('should find post by Id', async () => {
    const postId = randomUUID();

    const res = await postRepository.findById(postId);

    expect(res).toEqual(post);
    expect(repository.findOne).toHaveBeenCalledWith(postId);
  });

  it('should find with filters', async () => {
    const paginationMock = PostMock.getPaginationMock();
    const paginatedPosts = PostMock.getPaginatedPosts(posts, paginationMock);

    const res = await postRepository.findWithFilters(paginationMock);

    expect(res).toEqual(paginatedPosts);
    expect(repository.findAndCount).toHaveBeenCalled();
  });

  it('should find with filters', async () => {
    const userId = randomUUID();
    const paginationMock = PostMock.getPaginationMock();
    const paginatedPosts = PostMock.getPaginatedPosts(posts, paginationMock);

    const res = await postRepository.findUserPosts(userId, paginationMock);

    expect(res).toEqual(paginatedPosts);
    expect(repository.findAndCount).toHaveBeenCalled();
  });

  it('should create post', async () => {
    const res = await postRepository.createPost(post);

    expect(res).toEqual(post);
    expect(repository.save).toHaveBeenCalledWith(post);
  });
});
