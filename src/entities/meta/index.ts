import { AxiosError } from "axios";

export type TMetaItem = {
  code: number;
  status: string;
  message: string;
  page: number;
  perPage: number;
  totalPage: number;
  nextPage: number | null;
  prevPage: number | null;
};

export type TMetaResponse<T> = {
  data: T;
} & TMetaItem;

export type TMetaErrorResponse = AxiosError<TMetaItem>;
