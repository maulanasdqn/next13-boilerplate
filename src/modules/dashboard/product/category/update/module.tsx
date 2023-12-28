"use client";
import { Button, ControlledFieldText, FormTemplate } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { notifyMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const DashboardProductCategoryUpdateModule = () => {
  const { id } = useParams();
  const { mutate } = clientTrpc.updateProductCategory.useMutation();
  const { data: detail } = clientTrpc.getProductCategoryById.useQuery({
    id: id as string,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<{ name: string }>({
    resolver: zodResolver(z.object({ name: z.string().min(1, { message: "Wajib diisi" }) })),
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    reset({
      name: detail?.name as string,
    });
  }, [detail, reset]);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(
      {
        id: id as string,
        name: data.name,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/product/category?title=Data Kategori Produk");
          notifyMessage({ type: "success", message: "Kategori Produk Berhasil Diperbarui" });
        },
      },
    );
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
