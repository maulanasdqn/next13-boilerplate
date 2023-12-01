"use server";
import { prisma } from "@/libs";
import { hash } from "bcryptjs";

type TRegister = {
  name: string;
  email: string;
  password: string;
};

export const RegisterAction = async (payload: TRegister) => {
  const hashedPassword = await hash(payload.password, 12);

  if (!payload.email || !payload.password) {
    throw new Error("Email dan Password wajib diisi");
  }

  if (payload.password.length < 6) {
    throw new Error("Password minimal 6 karakter");
  }

  if (!payload.name) {
    throw new Error("Nama wajib diisi");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  try {
    if (user) {
      throw new Error("Email sudah terdaftar");
    }

    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
};
