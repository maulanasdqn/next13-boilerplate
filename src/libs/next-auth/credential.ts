import CredentialsProvider from "next-auth/providers/credentials";
import { db, roles, users } from "@/server";
import { eq } from "drizzle-orm";
import * as bs from "bcryptjs";

export const credentialProvider = CredentialsProvider({
  id: "login",
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {
    if (!credentials?.email || !credentials.password) {
      throw new Error("Email dan Password wajib diisi");
    }

    const user = await db
      .select()
      .from(users)
      .leftJoin(roles, eq(users.role_id, roles.id))
      .where(eq(users.email, credentials.email as string))
      .then((res) => res.at(0));

    const isPasswordCorrect = await bs.compare(
      credentials.password as string,
      user?.user?.password as string,
    );

    if (!user || !isPasswordCorrect) {
      throw new Error("Email atau Password salah");
    }

    return {
      id: user?.user.id,
      email: user?.user.email,
      fullname: user?.user.fullname,
      role: {
        id: user?.app_roles?.id,
        name: user?.app_roles?.name,
        permissions: user?.app_roles?.permissions,
      },
    };
  },
});
