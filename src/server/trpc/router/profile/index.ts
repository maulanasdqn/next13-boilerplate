import { publicProcedure } from "@/libs/trpc/init";
import { db, users } from "@/server";
import { eq } from "drizzle-orm";

export const getProfile = publicProcedure.query(async ({ ctx }) => {
  try {
    return ctx.session;
  } catch (err) {
    throw new Error(err as string);
  }
});

export const getPassword = publicProcedure.query(async ({ ctx }) => {
  try {
    return await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.id, ctx.session?.user?.id as string))
      .then((res) => res.at(0)?.password);
  } catch (err) {
    throw new Error(err as string);
  }
});
