import { publicProcedure } from "@/libs/trpc/init";
import { db, products } from "@/server";

export const getProducts = publicProcedure.query(async () => {
  try {
    const res = await db.select().from(products);
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});
