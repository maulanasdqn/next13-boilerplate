"use client";
import { Button, ControlledFieldCheckbox, ControlledFieldText } from "@/components";
import { FC, ReactElement, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TVSRegister, VSRegister } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { IoLogoGoogle, IoMdClose } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RegisterAction } from "./action";

export const AuthRegisterModule: FC = (): ReactElement => {
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") ||
    "/auth/login?register_success=Berhasil Mendaftar silahkan masuk";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TVSRegister>({
    mode: "all",
    resolver: zodResolver(VSRegister),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await RegisterAction({
        fullname: data.name,
        email: data.email,
        password: data.password,
      });
      router.push(callbackUrl);
    } catch (error) {
      setError(error as string);
    }
    setIsLoading(false);
  });

  useLayoutEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  }, [error]);

  return (
    <form
      onSubmit={onSubmit}
      className="md:w-1/2 w-full border h-full gap-y-4 justify-center flex flex-col md:px-12 px-6 rounded-lg"
    >
      <div className="flex flex-col gap-y-2">
        <h1 className="text-4xl text-gray-600 text-center font-medium">Daftar</h1>
      </div>
      {error && (
        <span className="bg-red-50 text-red-500 p-4 rounded-lg border border-red-500 flex justify-between items-center">
          {typeof error !== "string" ? "Email sudah digunakan" : error}
          <IoMdClose onClick={() => setError(null)} className="cursor-pointer" size={20} />
        </span>
      )}
      <ControlledFieldText
        required
        size="sm"
        type="text"
        control={control}
        name="name"
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap"
        status={errors.name ? "error" : "none"}
        message={errors.name?.message}
      />
      <ControlledFieldText
        required
        size="sm"
        type="email"
        control={control}
        name="email"
        label="Email"
        placeholder="Masukkan Email"
        status={errors.email ? "error" : "none"}
        message={errors.email?.message}
      />
      <ControlledFieldText
        required
        size="sm"
        type="password"
        control={control}
        name="password"
        label="Kata sandi"
        hint="Kata sandi setidaknya ada 8 karakter"
        placeholder="Masukkan Kata sandi"
        status={errors.password ? "error" : "none"}
        message={errors.password?.message}
      />
      <ControlledFieldText
        required
        size="sm"
        type="password"
        control={control}
        name="confirm_password"
        label="Konfirmasi Kata sandi"
        placeholder="Masukkan Konfirmasi Kata sandi"
        status={errors.confirm_password ? "error" : "none"}
        message={errors.confirm_password?.message}
      />
      <ControlledFieldCheckbox
        size="sm"
        control={control}
        name="toc"
        text="Syarat & Ketentuan Berlaku"
      />
      <Button isloading={+isLoading} disabled={!isValid} size="md" type="submit">
        Daftar Sekarang
      </Button>
      <hr />
      <Button
        onClick={() => signIn("google", { callbackUrl })}
        variant="cancel"
        size="md"
        type="button"
      >
        <div className="flex w-full items-center justify-center gap-x-2">
          <span> Daftar Dengan Google </span> <IoLogoGoogle size="20px" />
        </div>
      </Button>

      <div className="w-full flex justify-between">
        <p>
          Sudah punya akun?{" "}
          <Link className="text-blue-600" href="/auth/login">
            Masuk disini
          </Link>
        </p>
      </div>
    </form>
  );
};
