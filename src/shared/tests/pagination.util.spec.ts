import {
  PaginatedResponse,
  parsePaginationOptions,
} from '../utils/pagination.util';

const paginationMock = {
  skip: 0,
  take: 10,
  count: 10,
};
const mockType: any = {};
describe('Pagination Util tests', () => {
  let paginationUtil: PaginatedResponse<any>;

  beforeEach(() => {
    paginationUtil = new PaginatedResponse(mockType, paginationMock);
  });

  it('should be defined', () => {
    expect(paginationUtil).toBeDefined();
  });

  it('should parse pagination options', () => {
    const pagination = parsePaginationOptions(paginationMock);
    expect(pagination).toBeDefined();
    expect(typeof pagination.skip).toBe('number');
    expect(typeof pagination.take).toBe('number');
  });
});
