import { z } from "zod";

export const VSReportTransaction = z.object({
  id: z.string(),
  price: z.number(),
  transactionDate: z.string(),
  transactionTime: z.string(),
  totalSelled: z.number(),
  itemId: z.string(),
  paymentId: z.string(),
  totalPrice: z.number(),
  name: z.string(),
  paymentMethod: z.string(),
  userId: z.string(),
  createdDate: z.date(),
});

export type TVSReportTransaction = z.infer<typeof VSReportTransaction>;
