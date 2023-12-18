import { publicProcedure } from "@/libs/trpc/init";
import { db, mixins } from "@/server";
import { z } from "zod";

export const updateSidebarState = publicProcedure
  .input(
    z.object({
      isOpen: z.boolean(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db.update(mixins).set({ sidebar: input?.isOpen }).returning();
    } catch (err) {
      throw new Error(err as string);
    }
  });

export const getSidebarState = publicProcedure.query(async () => {
  try {
    const res = await db
      .select({ sidebar: mixins.sidebar })
      .from(mixins)
      .limit(1)
      .then((res) => res.at(0)?.sidebar);
    return res;
  } catch (err) {
    throw new Error(err as string);
  }
});
