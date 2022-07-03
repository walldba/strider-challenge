import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserMock } from '../src/user/tests/mocks/user.mock';
import { Repository } from 'typeorm';
import { User } from '../src/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../src/post/entities/post.entity';
import { faker } from '@faker-js/faker';
import { PostTypeEnum } from '../src/post/enums/post-type.enum';

const user = UserMock.getUserMock();

jest.setTimeout(30000);
describe('User (e2e tests)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let postRepository: Repository<Post>;
  let baseUser: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('/api');

    userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    postRepository = app.get<Repository<Post>>(getRepositoryToken(Post));

    baseUser = await userRepository.save(user);

    await app.init();
  });

  afterAll(async () => {
    await postRepository.delete({ user: { id: baseUser.id } });
    await userRepository.delete(baseUser.id);

    await app?.close();
  });

  describe('/users/', () => {
    it('should find user by Id', async () => {
      return request(app.getHttpServer())
        .get(`/api/user/${baseUser.id}`)
        .expect(200)
        .expect(user.toJSON());
    });

    it('should create a post', async () => {
      return request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.ORIGINAL,
          content: faker.random.words(),
        })
        .expect(201);
    });

    it('should not create a repost with content', async () => {
      return request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.REPOST,
          content: faker.random.words(),
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'Post of Type "Repost" cannot have a content',
            'originalPostId must be a UUID',
          ],
          error: 'Bad Request',
        });
    });

    it('should not create a repost to another repost', async () => {
      const originalPost = await request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.ORIGINAL,
          content: faker.random.words(),
        })
        .expect(201);

      const repost = await request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.REPOST,
          originalPostId: originalPost.body.id,
        })
        .expect(201);

      return request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.REPOST,
          originalPostId: repost.body.id,
        })
        .expect(400);
    });

    it('should not create a quote to another quote', async () => {
      const originalPost = await request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.ORIGINAL,
          content: faker.random.words(),
        })
        .expect(201);

      const quote = await request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.QUOTE,
          content: faker.random.words(),
          originalPostId: originalPost.body.id,
        })
        .expect(201);

      return request(app.getHttpServer())
        .post(`/api/user/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.QUOTE,
          originalPostId: quote.body.id,
        })
        .expect(400);
    });

    it('should find user posts by User Id', async () => {
      return request(app.getHttpServer())
        .get(`/api/user/${baseUser.id}/posts?skip=0&take=5`)
        .expect(200);
    });
  });
});
