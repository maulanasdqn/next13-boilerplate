import { VSRegister } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { ROLES, db, roles, users } from "@/server";
import { eq } from "drizzle-orm";
import * as bs from "bcryptjs";

export const createUser = publicProcedure.input(VSRegister).mutation(async ({ input }) => {
  try {
    const password = await bs.hash(input.password, await bs.genSalt(12));

    const roleId = await db
      .select({ id: roles.id })
      .from(roles)
      .where(eq(roles.name, ROLES.GUEST))
      .limit(1)
      .then((res) => res.at(0)?.id);

    await db
      .insert(users)
      .values({ ...input, password, roleId })
      .returning();
    return {
      message: "Registrasi Berhasil",
    };
  } catch (err) {
    return err;
  }
});
