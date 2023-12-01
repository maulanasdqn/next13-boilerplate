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
  try {
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
