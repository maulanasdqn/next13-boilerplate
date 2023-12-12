import { VSReportTransaction } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, report_transactions } from "@/server";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

export const getReportTransaction = publicProcedure.query(async () => {
  try {
    const res = await db
      .select()
      .from(report_transactions)
      .orderBy(asc(report_transactions.created_at));
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});

export const updateReportTransaction = publicProcedure
  .input(VSReportTransaction)
  .mutation(async ({ input }) => {
    try {
      await db
        .update(report_transactions)
        .set({
          ...input,
          total_selled: Number(input.total_selled),
          user_id: input.user_id as string,
          transaction_date: String(input.transaction_date),
        })
        .where(eq(report_transactions.id, input.id as string));
      return {
        message: "Berhasil mengupdate Transaksi!",
      };
    } catch (err) {
      return err;
    }
  });

export const deleteReportTransaction = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    try {
      await db.delete(report_transactions).where(eq(report_transactions.id, input.id as string));
      return {
        message: "Berhasil menghapus Transaksi!",
      };
    } catch (err) {
      return err;
    }
  });

export const getDetailReportTransaction = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    try {
      const res = await db
        .select()
        .from(report_transactions)
        .where(eq(report_transactions.id, input.id as string));
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  });

export const createReportTransaction = publicProcedure
  .input(VSReportTransaction)
  .mutation(async ({ input }) => {
    try {
      await db
        .insert(report_transactions)
        .values({
          ...input,
          total_selled: Number(input.total_selled),
          user_id: input.user_id as string,
          transaction_date: String(input.transaction_date),
        })
        .returning();
      return {
        message: "Berhasil membuat Transaksi baru!",
      };
    } catch (err) {
      throw new Error(err as string);
    }
  });
