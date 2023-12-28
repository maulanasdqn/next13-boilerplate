"use client";
import { Button, ControlledFieldSelect, ControlledFieldText, FormTemplate } from "@/components";
import { TRegister, VSRegister } from "@/entities";
import { clientTrpc } from "@/libs/trpc/client";
import { notifyMessage } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

export const DashboardUserCreateModule = () => {
  const { mutate } = clientTrpc.createUser.useMutation();
  const { data: roles } = clientTrpc.getRole.useQuery();

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TRegister>({
    resolver: zodResolver(VSRegister),
    mode: "all",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      roleId: "",
    },
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard/user?title=Data Pengguna");
        notifyMessage({ type: "success", message: "Pengguna Berhasil Dibuat" });
      },
    });
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
