import { VSMetaRequest, VSOrder } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, orders } from "@/server";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { eq, asc, ilike, or, and } from "drizzle-orm";
import { z } from "zod";

export const getOrder = publicProcedure.input(VSMetaRequest).query(async ({ input, ctx }) => {
  try {
    const page = input?.page || 1;
    const perPage = input?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select()
      .from(orders)
      .where(
        and(
          eq(orders.userId, ctx?.session?.user?.id as string),
          or(ilike(orders.name, `%${input?.search || ""}%`)),
        ),
      )
      .limit(perPage)
      .offset(input?.search ? 0 : offset)
      .orderBy(orders.createdAt, asc(orders.createdAt));

    const count = await db
      .select({ id: orders.id })
      .from(orders)
      .where(eq(orders.userId, ctx?.session?.user?.id as string))
      .then((res) => res.length);

    const totalPage = calculateTotalPages(count, perPage);
    const nextPage = page < totalPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const metaPrefix = {
      data,
      meta: {
        code: 200,
        status: "success",
        message: "Berhasil menampilkan order",
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

export const createOrder = publicProcedure.input(VSOrder).mutation(async ({ ctx, input }) => {
  try {
    const res = await db
      .insert(orders)
      .values({
        ...input,
        userId: ctx?.session?.user?.id as string,
        price: Number(input.price),
        quantity: Number(input.quantity),
      })
      .returning();
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});

export const deleteOrder = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    try {
      await db.delete(orders).where(eq(orders.id, input.id as string));
      return {
        message: "Berhasil menghapus Transaksi!",
      };
    } catch (err) {
      return err;
    }
  });

export const getDetailOrder = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    try {
      const res = await db
        .select()
        .from(orders)
        .where(eq(orders.id, input.id as string));
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  });
