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
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const DashboardProductCreateModule = () => {
  const { mutate } = clientTrpc.createProduct.useMutation();
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
    formState: { isValid, errors },
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

  console.log(errors);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(
      {
        categoryId: data.categoryId,
        name: data.name,
        price: Number(data.price),
        quantity: Number(data.quantity),
        description: data.description,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/product?title=Data Produk");
          notifyMessage({ type: "success", message: "Pengguna Berhasil Dibuat" });
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
