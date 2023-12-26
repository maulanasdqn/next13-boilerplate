import { publicProcedure } from "@/libs/trpc/init";
import { ROLES, business, db, roles, users } from "@/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const getBusiness = publicProcedure.query(async () => {
  try {
    const res = await db.select().from(business);
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});

export const createBusiness = publicProcedure
  .input(
    z.object({
      name: z.string(),
      phoneNumber: z.string(),
      ownerId: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      const roleId = await db
        .select({ id: roles.id })
        .from(roles)
        .where(eq(roles.name, ROLES.OWNER))
        .then((res) => res.at(0)?.id);

      await db.insert(business).values(input).returning();
      await db.update(users).set({ roleId }).returning();
    } catch (err) {
      throw new Error(err as string);
    }
  });
