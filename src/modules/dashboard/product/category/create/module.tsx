"use client";
import { Button, ControlledFieldSelect, ControlledFieldText, FormTemplate } from "@/components";
import { TRegister, VSRegister } from "@/entities";
import { clientTrpc } from "@/libs/trpc/client";
import { notifyMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const DashboardProductCategoryCreateModule = () => {
  const { mutate } = clientTrpc.createProductCategory.useMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<{ name: string }>({
    resolver: zodResolver(z.object({ name: z.string().min(1, { message: "Wajib diisi" }) })),
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/product/category?title=Data Kategori Produk");
        notifyMessage({ type: "success", message: "Kategori Produk Berhasil Dibuat" });
      },
    });
  });
  return (
    <FormTemplate onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-3 w-full">
        <ControlledFieldText
          size="sm"
          placeholder="Masukkan nama kategori"
          label="Nama Kategori"
          control={control}
          name={"name"}
          status={errors.name ? "error" : "none"}
          message={errors.name?.message}
        />
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
