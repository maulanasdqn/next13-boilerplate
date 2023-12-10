import { z } from "zod";

export const VSProduct = z.object({
  name: z.string({ required_error: "Nama akun harus diisi" }),
  price: z.number({ required_error: "Harga harus diisi" }),
  quantity: z.number({ required_error: "Kuantitas harus diisi" }),
  description: z.string({ required_error: "Deskripsi harus diisi" }),
});

export type TVSProduct = z.infer<typeof VSProduct>;
