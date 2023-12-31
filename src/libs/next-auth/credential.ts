import CredentialsProvider from "next-auth/providers/credentials";
import { business, db, roles, users } from "@/server";
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
      .leftJoin(roles, eq(users.roleId, roles.id))
      .leftJoin(business, eq(users.id, business.ownerId))
      .where(eq(users.email, credentials.email as string))
      .then((res) => res.at(0));

    const isHaveAPassword = user?.user?.password;

    const isActive = user?.user?.isActive;

    const isPasswordCorrect = await bs.compare(
      credentials.password as string,
      user?.user?.password as string,
    );

    if (!user || !isPasswordCorrect) {
      throw new Error("Email atau Password salah");
    }

    if (!isActive) {
      throw new Error("Akun ini sedang di non-aktifkan");
    }

    return {
      id: user?.user.id,
      email: user?.user.email,
      fullname: user?.user.fullname,
      image: user?.user.image,
      isPasswordSet: !!isHaveAPassword,
      business: {
        id: user?.app_business?.id,
        name: user?.app_business?.name,
        ownerId: user?.app_business?.ownerId,
        image: user?.app_business?.image,
        address: user?.app_business?.address,
        phoneNumber: user?.app_business?.phoneNumber,
      },
      role: {
        id: user?.app_roles?.id,
        name: user?.app_roles?.name,
        permissions: user?.app_roles?.permissions,
      },
    };
  },
});
