import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { ROLES, db, roles, users } from "@/server";
import { TUser } from "@/entities";
import { eq } from "drizzle-orm";
import { googleProvider } from "./google";
import { credentialProvider } from "./credential";

export const config = {
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

        const role = await db
          .select({ name: roles.name, id: roles.id, permissions: roles.permissions })
          .from(roles)
          .where(eq(roles.name, ROLES.USER))
          .then((res) => res.at(0));

        const user = await db
          .select({ role_id: users.role_id, id: users.id })
          .from(users)
          .where(eq(users.email, profile.email as string))
          .then((res) => res.at(0));

        if (!user?.id) {
          await db
            .insert(users)
            .values({
              role_id: role?.id as string,
              fullname: profile?.name as string,
              email: profile?.email as string,
              image: p?.picture as string,
            })
            .returning();
        }

        if (!user?.role_id) {
          await db
            .update(users)
            .set({ role_id: role?.id })
            .where(eq(users.email, profile.email as string));
        }

        return {
          ...token,
          id: user?.id || "",
          fullname: profile.name,
          email: profile.email,
          image: p?.picture,
          role,
        };
      }

      if (account?.provider === "login" && us) {
        const u = us as TUser;
        return {
          ...token,
          id: u.id,
          fullname: u.fullname,
          email: u.email,
          role: {
            id: u.role.id,
            name: u.role.name,
            permissions: u.role.permissions,
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
      } as TUser;
      return session;
    },
  },
} satisfies NextAuthOptions;
