import { VSReportTransaction } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, report_transactions } from "@/server";

export const getReportTransaction = publicProcedure.query(async () => {
  try {
    const res = await db.select().from(report_transactions);
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});

export const createReportTransaction = publicProcedure
  .input(VSReportTransaction)
  .mutation(async ({ input }) => {
    try {
      await db.insert(report_transactions).values(input).returning();
      return {
        message: "Berhasil membuat Transaksi baru!",
      };
    } catch (err) {
      return err;
    }
  });
