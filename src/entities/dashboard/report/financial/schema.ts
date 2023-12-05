import { z } from "zod";

export const VSReportFinancial = z.object({
  id: z.string(),
  grossIncome: z.number(),
  netIncome: z.number(),
  operationalCosts: z.number(),
  details: z.string(),
  createdDate: z.date(),
});
