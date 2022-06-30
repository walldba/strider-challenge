import { PaginationOptions } from '../../shared/interfaces/pagination.interface';

export interface PostFilterOptions extends PaginationOptions {
  onlyMyPosts: boolean;
  userId: string;
  startDate: string;
  endDate: string;
}
