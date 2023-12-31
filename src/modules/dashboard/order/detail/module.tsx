"use client";
import {
  Button,
  ControlledFieldSelect,
  ControlledFieldText,
  ControlledFieldTextArea,
  FormTemplate,
} from "@/components";
import { VSOrder } from "@/entities";
import { clientTrpc } from "@/libs/trpc/client";
import { notifyMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const DashboardOrderDetailModule = () => {
  const { mutate } = clientTrpc.createOrder.useMutation();
  const { mutate: transaction } = clientTrpc.createReportTransaction.useMutation();
  const { data: paymentMethods } = clientTrpc.getPaymentMethod.useQuery();
  const { data: products } = clientTrpc.getProduct.useQuery();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<z.infer<typeof VSOrder>>({
    resolver: zodResolver(VSOrder),
    mode: "all",
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data, {
      onSuccess: () => {
        transaction(
          {
            totalPrice: data.price,
            productId: data.productId,
            name: data.name,
            userId: data.userId,
            price: data.price,
            paymentId: data.paymentId,
            customerId: data.customerId,
            transactionDate: new Date(),
            transactionTime: String(new Date().getTime()),
            totalSelled: data.quantity,
          },
          {
            onSuccess: () => {
              router.push("/dashboard/order?title=Data Pengguna");
              notifyMessage({ type: "success", message: "Pengguna Berhasil Pesanan" });
            },

            onError: (err) => {
              notifyMessage({ type: "error", message: err.message });
            },
          },
        );
      },
    });
  });

  const paymentMethodOptions = useMemo(() => {
    return paymentMethods?.data?.map((paymentMethod) => ({
      label: paymentMethod.providerName,
      value: paymentMethod.id,
    }));
  }, [paymentMethods]);

  const productOptions = useMemo(() => {
    return products?.data?.map((product) => ({
      label: product.name,
      value: product.id,
    }));
  }, [products]);

  return (
    <FormTemplate onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-3 w-full">
        <div className="flex gap-x-3 w-full">
          <ControlledFieldText
            size="sm"
            placeholder="Masukan Nama Pesanan"
            label="Nama Pesanan"
            control={control}
            name={"name"}
            status={errors.name ? "error" : "none"}
            message={errors.name?.message}
          />
          <ControlledFieldTextArea
            size="sm"
            placeholder="Masukkan deskripsi"
            label="Deskripsi Pesanan"
            control={control}
            name={"description"}
            status={errors.description ? "error" : "none"}
            message={errors.description?.message}
          />
        </div>
        <div className="flex gap-x-3 w-full">
          <ControlledFieldText
            size="sm"
            placeholder="Masukan Harga"
            label="Harga"
            control={control}
            name={"price"}
            type="number"
            status={errors.price ? "error" : "none"}
            message={errors.price?.message}
          />
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan jumlah beli"
            label="Jumlah"
            control={control}
            name={"quantity"}
            type="number"
            status={errors.quantity ? "error" : "none"}
            message={errors.quantity?.message}
          />
        </div>
        <div className="flex gap-x-3 w-full">
          <ControlledFieldSelect
            size="sm"
            options={paymentMethodOptions}
            placeholder="Pilih Metode Pembayaran"
            label="Metode Pembayaran"
            control={control}
            name={"paymentId"}
            status={errors.paymentId ? "error" : "none"}
            message={errors.paymentId?.message}
          />
          <ControlledFieldSelect
            size="sm"
            options={productOptions}
            placeholder="Pilih Produk"
            label="Produk"
            control={control}
            name={"productId"}
            status={errors.productId ? "error" : "none"}
            message={errors.productId?.message}
          />
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button type="submit" size="sm" disabled={!isValid}>
          Simpan
        </Button>
        <Button
          onClick={() => {
            reset();
          }}
          type="button"
          size="sm"
          variant="cancel"
        >
          Batal
        </Button>
      </div>
    </FormTemplate>
  );
};
