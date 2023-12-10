import { publicProcedure } from "@/libs/trpc/init";
import { customers, db } from "@/server";

export const getCustomers = publicProcedure.query(async () => {
  try {
    const res = await db.select().from(customers);
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});
