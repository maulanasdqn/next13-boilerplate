import { z } from "zod";

export const VSReportTransaction = z.object({
  id: z.string().optional(),
  product_id: z
    .string({
      required_error: "Produk harus diisi",
      invalid_type_error: "Produk tidak valid",
    })
    .min(1, { message: "Produk harus diisi" }),
  payment_id: z.string({
    required_error: "Metode pembayaran harus diisi",
    invalid_type_error: "Metode pembayaran tidak valid",
  }),
  user_id: z.string(),
  customer_id: z.string({ required_error: "Pelanggan harus diisi" }),
  name: z.string({ required_error: "Nama harus diisi" }).min(1, { message: "Nama harus diisi" }),
  price: z.string({ required_error: "Harga harus diisi" }),
  transaction_date: z.string({ required_error: "Waktu transaksi harus diisi" }),
  transaction_time: z.string({ required_error: "Waktu transaksi harus diisi" }),
  total_selled: z
    .string({ required_error: "Total terjual harus diisi" })
    .min(1, { message: "Total terjual harus diisi" }),
  total_price: z.string({ required_error: "Total harga harus diisi" }),
});

export type TVSReportTransaction = z.infer<typeof VSReportTransaction>;
