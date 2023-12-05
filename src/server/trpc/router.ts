import { publicProcedure, router } from "@/libs/trpc/init";
import { db, roles, users } from "..";
import { VSRegister } from "@/entities";
import { eq } from "drizzle-orm";
import * as bs from "bcryptjs";

export const appRouter = router({
  getReportTransaction: publicProcedure.query(async () => {
    try {
      const res: Array<any> = [];
      return res;
    } catch (err) {
      throw new Error(err as string);
    }
  }),

  createUser: publicProcedure.input(VSRegister).mutation(async ({ input }) => {
    try {
      const password = await bs.hash(input.password, await bs.genSalt(12));

      const roleId = await db
        .select({ id: roles.id })
        .from(roles)
        .where(eq(roles.name, "User"))
        .limit(1);

      await db
        .insert(users)
        .values({ ...input, password, role_id: roleId[0].id })
        .returning();
      return {
        message: "Registrasi Berhasil",
      };
    } catch (err) {
      return err;
    }
  }),
});

export type AppRouter = typeof appRouter;
