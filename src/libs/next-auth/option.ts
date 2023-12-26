import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { ROLES, business, db, roles, users } from "@/server";
import { TUser } from "@/entities";
import { eq } from "drizzle-orm";
import { googleProvider } from "./google";
import { credentialProvider } from "./credential";

export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [googleProvider, credentialProvider],
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ user: us, token, account, profile }) {
      if (account?.provider === "google" && profile) {
        const p = profile as any;

        const roleId = await db
          .select({ id: roles.id })
          .from(roles)
          .where(eq(roles.name, ROLES.MEMBER))
          .then((res) => res.at(0)?.id);

        const userData = await db
          .select({ id: users.id, roleId: users.roleId })
          .from(users)
          .where(eq(users.email, profile.email as string))
          .then((res) => res.at(0));

        if (!userData?.id) {
          await db
            .insert(users)
            .values({
              roleId,
              fullname: profile?.name as string,
              email: profile?.email as string,
              image: p?.picture as string,
            })
            .returning();
        }

        if (!userData?.roleId) {
          await db
            .update(users)
            .set({ roleId })
            .where(eq(users.id, userData?.id as string))
            .returning();
        }

        const data = await db
          .select()
          .from(users)
          .leftJoin(roles, eq(users.roleId, roles.id))
          .leftJoin(business, eq(users.id, business.ownerId))
          .where(eq(users.email, profile.email as string))
          .then((res) => res.at(0));

        return {
          ...token,
          ...data?.user,
          role: {
            id: data?.app_roles?.id,
            name: data?.app_roles?.name,
            permissions: data?.app_roles?.permissions,
          },
          business: {
            id: data?.app_business?.id,
            name: data?.app_business?.name,
            ownerId: data?.app_business?.ownerId,
            phoneNumber: data?.app_business?.phoneNumber,
            address: data?.app_business?.address,
          },
        };
      }

      if (account?.provider === "login" && us) {
        const u = us as TUser;
        return {
          ...token,
          id: u.id,
          fullname: u.fullname,
          email: u.email,
          image: u.image,
          role: {
            id: u.role.id,
            name: u.role.name,
            permissions: u.role.permissions,
          },
          business: {
            id: u.business?.id,
            name: u.business?.name,
            ownerId: u.business?.ownerId,
            phoneNumber: u.business?.phoneNumber,
            address: u.business?.address,
          },
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token?.id,
        fullname: token?.fullname,
        image: token?.image,
        email: token.email,
        role: token.role,
        business: token.business,
      } as TUser;
      return session;
    },
  },
} satisfies NextAuthOptions;
