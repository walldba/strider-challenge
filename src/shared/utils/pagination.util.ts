import { PaginationOptions } from '../interfaces/pagination.interface';
import { PaginatedResponseMeta } from '../interfaces/pagination.interface';

export class PaginatedResponse<T> {
  public readonly data: T;
  public readonly meta: PaginatedResponseMeta;

  constructor(data: T, pagination: PaginationOptions & { count: number }) {
    this.data = data;
    this.meta = {
      count: pagination.count,
      skip: pagination.skip,
      take: pagination.take,
    };
  }
}

export function parsePaginationOptions(options: {
  take: number | string | undefined;
  skip: number | string | undefined;
}): PaginationOptions {
  return {
    take: Number(options.take) || 5,
    skip: Number(options.skip) || 0,
  };
}
