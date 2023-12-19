export interface IPagination {
  page: number;
  perPage: number;
  startIndex?: number;
  endIndex?: number;
}

export interface IPaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}
