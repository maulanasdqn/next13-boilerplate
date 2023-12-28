"use client";
import { Button, ControlledFieldText, FormTemplate } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { notifyMessage } from "@/utils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const DashboardUserRoleCreateModule = () => {
  const { mutate } = clientTrpc.createRole.useMutation();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/user/role?title=Data Role");
        notifyMessage({ type: "success", message: "Hak akses Berhasil Dibuat" });
      },
    });
  });

  return (
    <FormTemplate onSubmit={onSubmit}>
      <div className="flex gap-x-3 w-full">
        <ControlledFieldText
          size="sm"
          placeholder="Masukkan nama hak akses"
          label="Nama Hak Akses"
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
