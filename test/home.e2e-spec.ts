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
describe('Home (e2e tests)', () => {
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

  describe('/home/', () => {
    it('should find posts', async () => {
      return request(app.getHttpServer())
        .get(`/api/home/posts?userId=${baseUser.id}&skip=0&take=5`)
        .expect(200);
    });

    it('should create a post', async () => {
      return request(app.getHttpServer())
        .post(`/api/home/${baseUser.id}/post`)
        .send({
          type: PostTypeEnum.ORIGINAL,
          content: faker.random.words(),
        })
        .expect(201);
    });
  });
});
