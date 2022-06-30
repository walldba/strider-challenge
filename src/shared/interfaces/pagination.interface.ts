export interface PaginatedResponseMeta {
  count?: number;
  take: number;
  skip: number;
}

export interface PaginationOptions {
  take: number;
  skip: number;
}
