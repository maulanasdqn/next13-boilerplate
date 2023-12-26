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
      productId: undefined,
      paymentId: undefined,
      totalSelled: undefined,
      totalPrice: undefined,
      price: undefined,
      transactionDate: undefined,
      transactionTime: undefined,
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
        label: payment.providerName,
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
    const product = products?.find((product) => product.id === watch("productId"));
    const payment = paymentMethods?.find((payment) => payment.id === watch("paymentId"));

    if (product && payment) {
      setValue("price", String(product.price));
      setValue("totalPrice", String(product.price * Number(watch("totalSelled"))));
      return {
        price: product.price,
        total_price: product.price * Number(watch("totalSelled")),
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
        userId: session?.user?.id as string,
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
          name="productId"
          placeholder="Pilih Produk"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 w-full">
        <ControlledFieldSelect
          size="sm"
          label="Metode Pembayaran"
          options={paymentMethodOptions}
          control={control}
          name="paymentId"
          placeholder="Pilih Metode Pembayaran"
        />
        <ControlledFieldSelect
          size="sm"
          label="Pelanggan"
          options={customerOptions}
          control={control}
          name="customerId"
          placeholder="Pilih Pelanggan"
        />
      </div>
      <div className="flex md:flex-row flex-col gap-y-3 md:gap-x-3 w-full">
        <ControlledFieldDate
          size="sm"
          placeholder="Pilih Tanggal Transaksi"
          label="Tanggal Transaksi"
          control={control}
          name={"transactionDate"}
        />
        <ControlledFieldText
          size="sm"
          placeholder="Pilih Waktu Transaksi"
          label="Waktu Transaksi"
          control={control}
          name={"transactionTime"}
          status={errors.transactionTime ? "error" : "none"}
          message={errors.transactionTime?.message}
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
          name={"totalSelled"}
          status={errors.totalSelled ? "error" : "none"}
          message={errors.totalSelled?.message}
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
