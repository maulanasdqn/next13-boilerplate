import { z } from "zod";

export const VSReportTransaction = z.object({
  product_id: z.string(),
  payment_id: z.string(),
  user_id: z.string(),
  name: z.string(),
  price: z.number(),
  transaction_date: z.string(),
  transaction_time: z.string(),
  total_selled: z.number(),
  total_price: z.number(),
  payment_method: z.string(),
});

export type TVSReportTransaction = z.infer<typeof VSReportTransaction>;
