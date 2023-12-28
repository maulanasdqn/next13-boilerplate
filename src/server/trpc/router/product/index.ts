import { VSMetaRequest } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, products } from "@/server";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { asc, eq, ilike, or, and } from "drizzle-orm";
import { z } from "zod";

export * from "./category";

export const getProduct = publicProcedure.input(VSMetaRequest).query(async ({ input, ctx }) => {
  try {
    const page = input?.page || 1;
    const perPage = input?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.userId, ctx?.session?.user?.id as string),
          or(ilike(products.name, `%${input?.search || ""}%`)),
        ),
      )
      .limit(perPage)
      .offset(input?.search ? 0 : offset)
      .orderBy(products.createdAt, asc(products.createdAt));

    const count = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.userId, ctx?.session?.user?.id as string))
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

export const createProduct = publicProcedure
  .input(
    z.object({
      categoryId: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      description: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      return await db
        .insert(products)
        .values({ ...input, userId: ctx?.session?.user?.id as string })
        .returning();
    } catch (err) {
      throw new Error(err as string);
    }
  });
