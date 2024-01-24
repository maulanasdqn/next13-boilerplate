import { AxiosError } from "axios";
import { z } from "zod";

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

export const VSMetaRequest = z
  .object({
    search: z.string(),
    page: z.number(),
    perPage: z.number(),
    businessId: z.string().optional(),
  })
  .optional();

export type TMetaResponse<T, M = TMetaItem> = {
  data: T;
  meta: M;
};

export type TMetaErrorResponse = AxiosError<TMetaItem>;
