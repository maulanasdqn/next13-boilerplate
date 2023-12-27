import { z } from "zod";

export const VSOrder = z.object({
  id: z.string().optional(),
  productId: z
    .string({
      required_error: "Produk harus diisi",
      invalid_type_error: "Produk tidak valid",
    })
    .min(1, { message: "Produk harus diisi" }),
  paymentId: z.string({
    required_error: "Metode pembayaran harus diisi",
    invalid_type_error: "Metode pembayaran tidak valid",
  }),
  userId: z.string(),
  customerId: z
    .string({ required_error: "Pelanggan harus diisi" })
    .min(1, { message: "Pelanggan harus diisi" }),
  name: z.string({ required_error: "Nama harus diisi" }).min(1, { message: "Nama harus diisi" }),
  description: z
    .string({ required_error: "Deskripsi harus diisi" })
    .min(1, { message: "Deskripsi harus diisi" }),
  price: z.string({ required_error: "Harga harus diisi" }).min(1, { message: "Harga harus diisi" }),
  quantity: z
    .string({ required_error: "Jumlah harus diisi" })
    .min(1, { message: "Jumlah harus diisi" }),
});

export type TVSOrder = z.infer<typeof VSOrder>;
