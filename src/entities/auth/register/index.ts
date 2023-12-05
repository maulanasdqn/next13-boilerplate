import { z } from "zod";

export const VSRegister = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string(),
  role_id: z.string().optional(),
});

export type TRegister = z.infer<typeof VSRegister>;
