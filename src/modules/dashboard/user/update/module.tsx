"use client";
import { Button, ControlledFieldSelect, ControlledFieldText, FormTemplate } from "@/components";
import { TRegister, VSRegister } from "@/entities";
import { clientTrpc } from "@/libs/trpc/client";
import { notifyMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export const DashboardUserUpdateModule = () => {
  const { id } = useParams();
  const { mutate } = clientTrpc.updateUser.useMutation();
  const { data: roles } = clientTrpc.getRole.useQuery();
  const { data: user } = clientTrpc.getDetailUser.useQuery(id as string);

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors, isDirty },
  } = useForm({
    resolver: zodResolver(VSRegister.omit({ password: true, email: true })),
    mode: "all",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      roleId: "",
    },
  });

  useEffect(() => {
    reset({
      fullname: user?.fullname as string,
      email: user?.email as string,
      roleId: user?.roleId as string,
    });
  }, [user, reset]);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(
      {
        id: id as string,
        fullname: data.fullname,
        email: user?.email as string,
        roleId: data.roleId,
        password: user?.password as string,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/user?title=Data Pengguna");
          notifyMessage({ type: "success", message: "Pengguna Berhasil Diperbarui" });
        },

        onError: () => {
          notifyMessage({ type: "error", message: "Pengguna Gagal Diperbarui" });
        },
      },
    );
  });

  const roleOptions = useMemo(() => {
    return roles?.data?.map((role) => ({
      label: role.name,
      value: role.id,
    }));
  }, [roles]);

  return (
    <FormTemplate onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-3 w-full">
        <div className="flex gap-x-3 w-full">
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan nama lengkap"
            label="Nama Lengkap"
            control={control}
            name={"fullname"}
            status={errors.fullname ? "error" : "none"}
            message={errors.fullname?.message}
          />
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan email"
            disabled
            label="Alamat Email"
            control={control}
            name={"email"}
            type="email"
            status={errors.email ? "error" : "none"}
            message={errors.email?.message}
          />
        </div>
        <div className="flex gap-x-3 w-full">
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan kata sandi"
            type="password"
            label="Kata sandi"
            control={control}
            name={"password"}
            disabled
            status={errors.password ? "error" : "none"}
            message={errors.password?.message}
          />
          <ControlledFieldSelect
            options={roleOptions}
            size="sm"
            placeholder="Hak Akses"
            label="Kata sandi"
            control={control}
            name={"roleId"}
            status={errors.roleId ? "error" : "none"}
            message={errors.roleId?.message}
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
