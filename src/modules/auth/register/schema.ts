import { z } from "zod";

export const VSRegister = z
  .object({
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
    confirm_password: z
      .string({
        required_error: "Konfirmasi Password harus diisi",
      })
      .min(6, { message: "Konfirmasi Password minimal 6 karakter" }),

    toc: z.literal(true, {
      errorMap: () => ({ message: "Anda harus menyetujui syarat dan ketentuan" }),
    }),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm_password"],
        message: "Konfirmasi Kata sandi harus sama dengan Kata sandi",
      });
    }
  });

export type TVSRegister = z.infer<typeof VSRegister>;
