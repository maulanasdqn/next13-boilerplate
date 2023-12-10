import { publicProcedure } from "@/libs/trpc/init";
import { db, payment_methods } from "@/server";

export const getPaymentMethods = publicProcedure.query(async () => {
  try {
    const res = await db.select().from(payment_methods);
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});
