import { z } from "zod";

export const VSRegister = z.object({
  id: z.string().optional(),
  fullname: z.string(),
  email: z.string().email(),
  password: z.string(),
  roleId: z.string().optional(),
});

export type TRegister = z.infer<typeof VSRegister>;
