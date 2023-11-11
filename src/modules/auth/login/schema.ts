import { z } from "zod";

export const VSLogin = z.object({
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
  remember: z.boolean().optional(),
  gender: z.string().optional(),
});

export type TVSLogin = z.infer<typeof VSLogin>;
