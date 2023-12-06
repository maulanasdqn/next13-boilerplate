"use client";
import { ControlledFieldSelect, ControlledFieldText, FormTemplate } from "@/components";
import { TVSReportTransaction, VSReportTransaction } from "@/entities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const DashboardReportTransactionCreateModule = () => {
  const { control } = useForm<TVSReportTransaction>({
    resolver: zodResolver(VSReportTransaction),
    defaultValues: {
      name: "",
      product_id: undefined,
      payment_id: undefined,
      user_id: undefined,
    },
  });

  const productOptions = [
    {
      label: "Beras",
      value: "beras",
    },
  ];

  return (
    <FormTemplate>
      <ControlledFieldText
        size="sm"
        placeholder="Masukkan nama transaksi"
        label="Nama Transaksi"
        control={control}
        name={"name"}
      />
      <ControlledFieldSelect
        size="sm"
        label="Produk"
        options={productOptions}
        control={control}
        name="product_id"
        placeholder="Pilih Produk"
      />
      <ControlledFieldSelect
        size="sm"
        label="Metode Pembayaran"
        options={productOptions}
        control={control}
        name="payment_id"
        placeholder="Pilih Metode Pembayaran"
      />
    </FormTemplate>
  );
};
