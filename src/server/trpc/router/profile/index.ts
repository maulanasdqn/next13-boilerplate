import { publicProcedure } from "@/libs/trpc/init";
import { db, users } from "@/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import * as bs from "bcryptjs";

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

export const updatePassword = publicProcedure
  .input(
    z.object({
      password: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const password = await bs.hash(input.password, await bs.genSalt(12));
      return await db
        .update(users)
        .set({ password })
        .where(eq(users.id, ctx.session?.user?.id as string))
        .returning();
    } catch (err) {
      throw new Error(err as string);
    }
  });
