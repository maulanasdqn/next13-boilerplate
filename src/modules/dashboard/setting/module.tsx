"use client";
import { Button, ControlledFieldText, FieldText, FieldTextArea, FormTemplate } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import Link from "next/link";
import { FC, ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Avatar from "react-avatar";
import { ROLES } from "@/server/database/schema";
import { IoMdAlert } from "react-icons/io";
import { useForm } from "react-hook-form";
import { notifyMessage } from "@/utils";

export const SettingModule: FC = (): ReactElement => {
  const { data } = clientTrpc.getProfile.useQuery();
  const { data: password, refetch } = clientTrpc.getPassword.useQuery();
  const { mutate: setPassword } = clientTrpc.updatePassword.useMutation();
  const [isAccountEdited, setIsAccountEdited] = useState(false);
  const [isBusinessEdited, setIsBusinessEdited] = useState(false);

  const router = useRouter();

  const { control: accountControl, reset, watch } = useForm();

  useEffect(() => {
    reset(data?.user);
  }, [data?.user, reset]);

  const params = useSearchParams();

  const menu = params?.get("menu");

  const className = (url: string) =>
    clsx({
      "text-gray-600 font-semibold p-2 rounded-lg bg-gray-100": menu === url,
      "text-gray-600 font-semibold p-2 rounded-lg": menu !== url,
      "text-gray-300 font-semibold p-2 rounded-lg": data?.user?.role?.name !== ROLES.OWNER,
    });

  return (
    <FormTemplate>
      <div className="flex w-full gap-x-6 min-h-screen h-full">
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg gap-y-4 w-[240px]">
          <Link
            className={className("account")}
            href="/dashboard/setting?menu=account&title=Pengaturan"
          >
            Pengaturan Akun
          </Link>
          {data?.user?.role?.name === ROLES.OWNER && (
            <Link
              className={className("business")}
              href="/dashboard/setting?menu=business&title=Pengaturan"
            >
              Pengaturan Bisnis
            </Link>
          )}
        </div>

        {menu === "account-password" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Atur Kata sandi</h1>
              </div>
            </div>
            <form className="flex flex-col gap-y-4">
              <ControlledFieldText
                size="sm"
                control={accountControl}
                name="password"
                type="password"
                label="Kata Sandi"
                placeholder="Masukkan Kata sandi anda"
                hint="Kata sandi harus terdiri dari 8 karakter"
                status={watch("password")?.length < 8 ? "error" : "none"}
                message="Kata sandi kurang dari 8 karakter"
              />

              <ControlledFieldText
                size="sm"
                type="password"
                control={accountControl}
                name="confirm_password"
                label="Konfirmasi Kata Sandi"
                placeholder="Masukkan konfirmasi kata sandi anda"
                status={watch("password") !== watch("confirm_password") ? "error" : "none"}
                message="Kata sandi tidak sama"
              />
              <div>
                <Button
                  size="sm"
                  disabled={
                    watch("password") !== watch("confirm_password") || watch("password")?.length < 8
                  }
                  onClick={() =>
                    setPassword(
                      { password: watch("password") },
                      {
                        onSuccess: () => {
                          refetch();
                          router.push("/dashboard/setting?title=Pengaturan&menu=account");
                          notifyMessage({ type: "success", message: "Kata sandi berhasil dibuat" });
                        },

                        onError: (err) => {
                          notifyMessage({ type: "error", message: err?.message });
                        },
                      },
                    )
                  }
                  variant="primary"
                  type="button"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        )}

        {menu === "account" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            {!password && (
              <div className="flex p-2 border-yellow-500 border rounded-lg text-yellow-500 bg-yellow-50 items-center gap-x-1">
                <IoMdAlert className="text-3xl" /> Kata sandi akun anda belum di atur
                <Link
                  href="/dashboard/setting?title=Pengaturan&menu=account-password"
                  className="underline"
                >
                  Klik disini
                </Link>
                untuk mengatur nya sekarang
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Akun</h1>
                <p>Disini kamu bisa atur akun kamu</p>
              </div>
              <div>
                {isAccountEdited ? (
                  <Button
                    size="sm"
                    onClick={() => setIsAccountEdited(false)}
                    type="button"
                    variant="cancel"
                  >
                    Batal
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsAccountEdited(true)}
                    variant="primary"
                    type="button"
                  >
                    Perbarui Akun
                  </Button>
                )}
              </div>
            </div>
            <form className="flex flex-col gap-y-4">
              {data?.user?.image ? (
                <Image
                  src={data?.user?.image as string}
                  alt="Dashboard"
                  className="rounded-lg"
                  width={100}
                  height={100}
                />
              ) : (
                <Avatar name={data?.user?.fullname} size="100" round={true} />
              )}
              <ControlledFieldText
                size="sm"
                control={accountControl}
                name="email"
                disabled
                label="Email"
              />
              <ControlledFieldText
                size="sm"
                control={accountControl}
                name="fullname"
                disabled={!isAccountEdited}
                label="Nama Lengkap"
              />
              <ControlledFieldText
                size="sm"
                control={accountControl}
                name="role.name"
                label="Hak Akses"
                disabled
              />
              {isAccountEdited && (
                <div>
                  <Button
                    size="sm"
                    onClick={() => setIsAccountEdited(true)}
                    variant="primary"
                    type="button"
                  >
                    Simpan
                  </Button>
                </div>
              )}
            </form>
          </div>
        )}

        {menu === "business" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            {!data?.user?.business?.address && (
              <div className="flex p-2 border-yellow-500 border rounded-lg text-yellow-500 bg-yellow-50 items-center gap-x-4">
                <IoMdAlert className="text-3xl" /> Alamat bisnis anda belum di atur
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Bisnis</h1>
                <p>Disini kamu bisa atur bisnis kamu</p>
              </div>
              <div>
                {isBusinessEdited ? (
                  <Button
                    size="sm"
                    onClick={() => setIsBusinessEdited(false)}
                    type="button"
                    variant="cancel"
                  >
                    Batal
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsBusinessEdited(true)}
                    variant="primary"
                    type="button"
                  >
                    Perbarui Bisnis
                  </Button>
                )}
              </div>
            </div>
            {data?.user?.business?.image ? (
              <Image
                src={data?.user?.business?.image as string}
                alt="Dashboard"
                className="rounded-lg"
                width={100}
                height={100}
              />
            ) : (
              <Avatar name={data?.user?.business?.name} size="100" className="rounded-lg" />
            )}

            <FieldText
              disabled={!isBusinessEdited}
              value={data?.user?.business?.name}
              label="Nama Bisnis"
            />
            <FieldText
              disabled={!isBusinessEdited}
              value={data?.user?.business?.phoneNumber}
              label="Nomor Telepon Bisnis"
            />
            <FieldTextArea
              disabled={!isBusinessEdited}
              label="Alamat Bisnis"
              readOnly
              value={data?.user?.business?.address}
            />
          </div>
        )}
      </div>
    </FormTemplate>
  );
};
