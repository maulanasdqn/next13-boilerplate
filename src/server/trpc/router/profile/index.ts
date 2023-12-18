import { publicProcedure } from "@/libs/trpc/init";

export const getProfile = publicProcedure.query(async ({ ctx }) => {
  try {
    return ctx.session;
  } catch (err) {
    throw new Error(err as string);
  }
});
