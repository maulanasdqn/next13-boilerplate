import { VSMetaRequest } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, payment_methods } from "@/server";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { asc, eq, ilike, or, and } from "drizzle-orm";

export const getPaymentMethod = publicProcedure
  .input(VSMetaRequest)
  .query(async ({ input, ctx }) => {
    try {
      const page = input?.page || 1;
      const perPage = input?.perPage || 10;
      const offset = (page - 1) * perPage;

      const data = await db
        .select()
        .from(payment_methods)
        .where(
          and(
            eq(payment_methods.userId, ctx?.session?.user?.id as string),
            or(ilike(payment_methods.providerName, `%${input?.search || ""}%`)),
          ),
        )
        .limit(perPage)
        .offset(input?.search ? 0 : offset)
        .orderBy(payment_methods.createdAt, asc(payment_methods.createdAt));

      const count = await db
        .select({ id: payment_methods.id })
        .from(payment_methods)
        .where(eq(payment_methods.userId, ctx?.session?.user?.id as string))
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
