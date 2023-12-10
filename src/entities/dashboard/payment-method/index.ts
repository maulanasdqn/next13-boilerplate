import { z } from "zod";

export const VSPaymentMethod = z.object({
  name: z.string({ required_error: "Nama akun harus diisi" }),
  provider_name: z.string({ required_error: "Nama penyedia harus diisi" }),
  account_number: z.string({ required_error: "Nomor akun harus diisi" }),
});

export type TVSPaymentMethod = z.infer<typeof VSPaymentMethod>;
