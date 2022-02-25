export interface ResponseResult<T> {
  [x: string]: any;
  code?: string;
  message: string;
  data: T;
  meta?: ResponseMetaInfo;
}

export interface ResponseMetaInfo {
  page: number;
  perPage: number;
  previousPage: number | boolean;
  nextPage: number | boolean;
  pageCount: number;
  total: number;
}
