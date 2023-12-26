import { z } from "zod";

export const VSReportTransaction = z.object({
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
  customerId: z.string({ required_error: "Pelanggan harus diisi" }),
  name: z.string({ required_error: "Nama harus diisi" }).min(1, { message: "Nama harus diisi" }),
  price: z.string({ required_error: "Harga harus diisi" }),
  transactionDate: z.coerce.date({ required_error: "Waktu transaksi harus diisi" }),
  transactionTime: z.string({ required_error: "Waktu transaksi harus diisi" }),
  totalSelled: z
    .string({ required_error: "Total terjual harus diisi" })
    .min(1, { message: "Total terjual harus diisi" }),
  totalPrice: z.string({ required_error: "Total harga harus diisi" }),
});

export type TVSReportTransaction = z.infer<typeof VSReportTransaction>;
