import { z } from "zod";

export const VSRegister = z.object({
  name: z
    .string({
      required_error: "Name harus diisi",
    })
    .min(3, { message: "Name minimal 3 karakter" }),
  email: z
    .string({
      required_error: "Email harus diisi",
    })
    .email({ message: "Email tidak valid" }),
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(6, { message: "Password minimal 6 karakter" }),
  toc: z.boolean({ required_error: "Ketentuan harus diisi" }),
});

export type TVSRegister = z.infer<typeof VSRegister>;
