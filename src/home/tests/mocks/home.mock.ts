import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { PaginationOptions } from '../../../shared/interfaces/pagination.interface';
import { HomeFindRequestDto } from '../../dto/home-find-request.dto';

export class HomeMock {
  static getHomeFindRequestMock(): HomeFindRequestDto {
    return {
      startDate: faker.date.past().toLocaleDateString(),
      endDate: faker.date.past().toLocaleDateString(),
      onlyMyPosts: false,
      userId: randomUUID(),
    };
  }

  static getPaginationMock(): PaginationOptions {
    return {
      skip: 0,
      take: 10,
    };
  }
}
