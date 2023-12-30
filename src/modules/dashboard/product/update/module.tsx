"use client";
import {
  Button,
  ControlledFieldSelect,
  ControlledFieldText,
  ControlledFieldTextArea,
  FormTemplate,
} from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { notifyMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const DashboardProductUpdateModule = () => {
  const { id } = useParams();
  const { mutate } = clientTrpc.updateProduct.useMutation();
  const { data: detail } = clientTrpc.getDetailProduct.useQuery({ id: id as string });
  const { data: categories } = clientTrpc.getProductCategory.useQuery();

  const schema = z.object({
    categoryId: z.string(),
    name: z.string(),
    price: z.string(),
    quantity: z.string(),
    description: z.string(),
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(
      z.object({
        categoryId: z.string(),
        name: z.string(),
        price: z.string(),
        quantity: z.string(),
        description: z.string(),
      }),
    ),
    mode: "all",
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(
      {
        id: id as string,
        categoryId: data.categoryId,
        name: data.name,
        price: Number(data.price),
        quantity: Number(data.quantity),
        description: data.description,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/product?title=Data Produk");
          notifyMessage({ type: "success", message: "Produk Berhasil Diperbarui" });
        },

        onError: () => {
          notifyMessage({ type: "error", message: "Terjadi Kesalahan, Produk Gagal Diperbarui" });
        },
      },
    );
  });

  const categoryOptions = useMemo(() => {
    return categories?.data?.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

  useEffect(() => {
    reset({
      categoryId: detail?.categoryId as string,
      name: detail?.name as string,
      price: String(detail?.price),
      quantity: String(detail?.quantity),
      description: detail?.description as string,
    });
  }, [detail, reset]);

  return (
    <FormTemplate onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-3 w-full">
        <div className="flex gap-x-3 w-full">
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan nama produk"
            label="Nama"
            control={control}
            name={"name"}
            status={errors.name ? "error" : "none"}
            message={errors.name?.message}
          />
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan harga produk"
            label="Harga"
            control={control}
            name={"price"}
            type="number"
            status={errors.price ? "error" : "none"}
            message={errors.price?.message}
          />
        </div>
        <div className="flex gap-x-3 w-full">
          <ControlledFieldTextArea
            size="sm"
            placeholder="Masukkan deskripsi produk"
            label="Deskripsi Produk"
            control={control}
            name={"description"}
            status={errors.description ? "error" : "none"}
            message={errors.description?.message}
          />
          <ControlledFieldSelect
            options={categoryOptions}
            size="sm"
            placeholder="Kategori Produk"
            label="Kategori Produk"
            control={control}
            name={"categoryId"}
            status={errors.categoryId ? "error" : "none"}
            message={errors.categoryId?.message}
          />
        </div>
        <div className="flex gap-x-3 w-1/2">
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan jumlah stok"
            label="Stok"
            control={control}
            name={"quantity"}
            status={errors.quantity ? "error" : "none"}
            message={errors.quantity?.message}
          />
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button type="submit" size="sm" disabled={!isValid && !isDirty}>
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
