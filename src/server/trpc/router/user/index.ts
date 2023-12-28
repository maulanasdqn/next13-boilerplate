import { VSMetaRequest, VSRegister } from "@/entities";
import { publicProcedure } from "@/libs/trpc/init";
import { db, roles, users } from "@/server";
import { calculateTotalPages, metaResponsePrefix } from "@/utils";
import { asc, desc, eq, ilike, or } from "drizzle-orm";
import { z } from "zod";
import * as bs from "bcryptjs";

export const getUser = publicProcedure.input(VSMetaRequest).query(async ({ input }) => {
  try {
    const page = input?.page || 1;
    const perPage = input?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select()
      .from(users)
      .where(or(ilike(users.fullname, `%${input?.search || ""}%`)))
      .leftJoin(roles, eq(users.roleId, roles.id))
      .limit(perPage)
      .offset(input?.search ? 0 : offset)
      .orderBy(users.createdAt, desc(users.createdAt))
      .then((res) =>
        res.map((x) => ({
          ...x.user,
          role: x.app_roles,
        })),
      );
    const count = await db
      .select({ id: users.id })
      .from(users)
      .then((res) => res.length);

    const totalPage = calculateTotalPages(count, perPage);
    const nextPage = page < totalPage ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    const metaPrefix = {
      data,
      meta: {
        code: 200,
        status: "success",
        message: "Berhasil menampilkan reservasi",
        page,
        perPage,
        totalPage,
        nextPage,
        prevPage,
      },
    };
    return metaResponsePrefix(metaPrefix);
  } catch (err) {
    throw new Error(err as string);
  }
});

export const deleteUser = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    try {
      await db.delete(users).where(eq(users.id, input.id as string));
      return {
        message: "Berhasil menghapus user!",
      };
    } catch (err) {
      throw new Error(err as string);
    }
  });

export const getDetailUser = publicProcedure.input(z.string()).query(async ({ input }) => {
  try {
    return await db
      .select()
      .from(users)
      .where(eq(users.id, input as string))
      .then((res) => res.at(0));
  } catch (err) {
    throw new Error(err as string);
  }
});

export const updateUser = publicProcedure.input(VSRegister).mutation(async ({ input }) => {
  try {
    await db
      .update(users)
      .set({ fullname: input?.fullname, password: input.password, roleId: input?.roleId })
      .where(eq(users.id, input?.id as string));
    return {
      message: "Berhasil mengupdate user!",
    };
  } catch (err) {
    throw new Error(err as string);
  }
});

export const changeStatusUser = publicProcedure
  .input(
    z.object({
      isActive: z.boolean(),
      id: z.string(),
    }),
  )
  .mutation(async ({ input }) => {
    try {
      await db
        .update(users)
        .set({ isActive: input?.isActive })
        .where(eq(users.id, input?.id as string));
      return {
        message: "Berhasil mengupdate user!",
      };
    } catch (err) {
      throw new Error(err as string);
    }
  });
