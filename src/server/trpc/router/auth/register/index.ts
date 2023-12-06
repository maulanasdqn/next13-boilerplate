import { VSRegister } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { ROLES, db, roles, users } from "@/server";
import { eq } from "drizzle-orm";
import * as bs from "bcryptjs";

export const registerRouter = {
  createUser: publicProcedure.input(VSRegister).mutation(async ({ input }) => {
    try {
      const password = await bs.hash(input.password, await bs.genSalt(12));

      const roleId = await db
        .select({ id: roles.id })
        .from(roles)
        .where(eq(roles.name, ROLES.USER))
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
};
