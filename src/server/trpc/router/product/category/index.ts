import { VSMetaRequest } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, product_categories } from "@/server";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { asc, eq, ilike, or, and } from "drizzle-orm";
import { z } from "zod";

export const getProductCategory = publicProcedure
  .input(VSMetaRequest)
  .query(async ({ input, ctx }) => {
    try {
      const page = input?.page || 1;
      const perPage = input?.perPage || 10;
      const offset = (page - 1) * perPage;

      const data = await db
        .select()
        .from(product_categories)
        .where(
          and(
            eq(product_categories.userId, ctx?.session?.user?.id as string),
            or(ilike(product_categories.name, `%${input?.search || ""}%`)),
          ),
        )
        .limit(perPage)
        .offset(input?.search ? 0 : offset)
        .orderBy(product_categories.createdAt, asc(product_categories.createdAt));

      const count = await db
        .select({ id: product_categories.id })
        .from(product_categories)
        .where(eq(product_categories.userId, ctx?.session?.user?.id as string))
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

export const createProductCategory = publicProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    await db.insert(product_categories).values({
      name: input.name,
      userId: ctx?.session?.user?.id as string,
    });
  });

export const updateProductCategory = publicProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    await db
      .update(product_categories)
      .set({ name: input.name })
      .where(eq(product_categories.id, input.id as string));
  });

export const getProductCategoryById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input }) => {
    try {
      return await db
        .select()
        .from(product_categories)
        .where(eq(product_categories.id, input.id as string))
        .then((res) => res.at(0));
    } catch (err) {
      throw new Error(err as string);
    }
  });
