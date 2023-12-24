"use client";
import {
  Button,
  ControlledFieldDate,
  ControlledFieldSelect,
  ControlledFieldText,
  FieldText,
  FormTemplate,
} from "@/components";
import { TVSReportTransaction, VSReportTransaction } from "@/entities";
import { clientTrpc } from "@/libs/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

export const DashboardReportTransactionCreateModule = () => {
  const { data: paymentMethods } = clientTrpc.getPaymentMethods.useQuery();
  const { data: products } = clientTrpc.getProducts.useQuery();
  const { data: customers } = clientTrpc.getCustomers.useQuery();
  const { data: session } = useSession();
  const { mutate } = clientTrpc.createReportTransaction.useMutation();

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TVSReportTransaction>({
    mode: "all",
    resolver: zodResolver(VSReportTransaction),
    defaultValues: {
      name: undefined,
      product_id: undefined,
      payment_id: undefined,
      total_selled: undefined,
      total_price: undefined,
      price: undefined,
      transaction_date: undefined,
      transaction_time: undefined,
    },
  });

  const productOptions = useMemo(
    () =>
      products?.map((product) => ({
        label: product.name,
        value: product.id,
      })),
    [products],
  );

  const paymentMethodOptions = useMemo(
    () =>
      paymentMethods?.map((payment) => ({
        label: payment.provider_name,
        value: payment.id,
      })),
    [paymentMethods],
  );

  const customerOptions = useMemo(
    () =>
      customers?.map((customer) => ({
        label: customer.name,
        value: customer.id,
      })),
    [customers],
  );

  const router = useRouter();

  const totalPrice = useCallback(() => {
    const product = products?.find((product) => product.id === watch("product_id"));
    const payment = paymentMethods?.find((payment) => payment.id === watch("payment_id"));
    if (product && payment) {
      setValue("price", String(product.price));
      setValue("total_price", String(product.price * Number(watch("total_selled"))));
      return {
        price: product.price,
        total_price: product.price * Number(watch("total_selled")),
      };
    }
    return {
      price: 0,
      total_price: 0,
    };
  }, [products, paymentMethods, watch, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    mutate(
      {
        ...data,
        user_id: session?.user?.id as string,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/report/transaction");
        },
      },
    );
    reset();
  });

  return (
    <FormTemplate onSubmit={onSubmit}>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 w-full">
        <ControlledFieldText
          size="sm"
          placeholder="Masukkan nama transaksi"
          label="Nama Transaksi"
          control={control}
          name={"name"}
          status={errors.name ? "error" : "none"}
          message={errors.name?.message}
        />
        <ControlledFieldSelect
          size="sm"
          label="Produk"
          options={productOptions}
          control={control}
          name="product_id"
          placeholder="Pilih Produk"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 w-full">
        <ControlledFieldSelect
          size="sm"
          label="Metode Pembayaran"
          options={paymentMethodOptions}
          control={control}
          name="payment_id"
          placeholder="Pilih Metode Pembayaran"
        />
        <ControlledFieldSelect
          size="sm"
          label="Pelanggan"
          options={customerOptions}
          control={control}
          name="customer_id"
          placeholder="Pilih Pelanggan"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 w-full">
        <ControlledFieldDate
          size="sm"
          placeholder="Pilih Tanggal Transaksi"
          label="Tanggal Transaksi"
          control={control}
          name={"transaction_date"}
        />
        <ControlledFieldText
          size="sm"
          placeholder="Pilih Waktu Transaksi"
          label="Waktu Transaksi"
          control={control}
          name={"transaction_time"}
          status={errors.transaction_time ? "error" : "none"}
          message={errors.transaction_time?.message}
          type="time"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 w-full">
        <FieldText
          size="sm"
          placeholder="Harga satuan akan muncul disini"
          label="Harga satuan"
          name={"price"}
          value={"Rp" + new Intl.NumberFormat("id").format(totalPrice().price)}
          type="text"
          readOnly
        />
        <ControlledFieldText
          size="sm"
          placeholder="Masukkan Jumlah Barang Yang dibeli"
          label="Jumlah Barang"
          control={control}
          name={"total_selled"}
          status={errors.total_selled ? "error" : "none"}
          message={errors.total_selled?.message}
          type="number"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 md:w-1/2 w-full">
        <FieldText
          size="sm"
          placeholder="Total harga akan muncul disini"
          label="Total Harga"
          name={"total_price"}
          value={"Rp" + new Intl.NumberFormat("id").format(totalPrice().total_price)}
          type="text"
          readOnly
        />
      </div>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 w-full">
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
