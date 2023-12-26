import { VSMetaRequest, VSReportTransaction } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, report_transactions } from "@/server";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { eq, asc, ilike, or, and } from "drizzle-orm";
import { z } from "zod";

export const getReportTransaction = publicProcedure
  .input(VSMetaRequest)
  .query(async ({ input, ctx }) => {
    try {
      const page = input?.page || 1;
      const perPage = input?.perPage || 10;
      const offset = (page - 1) * perPage;

      const data = await db
        .select()
        .from(report_transactions)
        .where(
          and(
            eq(report_transactions.userId, ctx?.session?.user?.id as string),
            or(ilike(report_transactions.name, `%${input?.search || ""}%`)),
          ),
        )
        .limit(perPage)
        .offset(input?.search ? 0 : offset)
        .orderBy(report_transactions.createdAt, asc(report_transactions.createdAt));

      const count = await db
        .select({ id: report_transactions.id })
        .from(report_transactions)
        .where(eq(report_transactions.userId, ctx?.session?.user?.id as string))
        .then((res) => res.length);

      const totalPage = calculateTotalPages(count, perPage);
      const nextPage = page < totalPage ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      const metaPrefix = {
        data,
        meta: {
          code: 200,
          status: "success",
          message: "Berhasil menampilkan reservasi",
          page,
          perPage,
          totalPage,
          nextPage,
          prevPage,
        },
      };
      return metaResponsePrefix(metaPrefix);
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
          totalSelled: Number(input.totalSelled),
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
          totalSelled: Number(input.totalSelled),
        })
        .returning();
      return {
        message: "Berhasil membuat Transaksi baru!",
      };
    } catch (err) {
      throw new Error(err as string);
    }
  });
