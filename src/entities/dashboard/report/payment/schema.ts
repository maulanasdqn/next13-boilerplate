import { z } from "zod";

export const VSReportPayment = z.object({
  id: z.string(),
  price: z.number(),
  details: z.string(),
  totalPayment: z.number(),
  userId: z.string(),
  name: z.string(),
  createdDate: z.date(),
});
