"use client";
import { Button, FieldText, FieldTextArea, FormTemplate } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import Link from "next/link";
import { FC, ReactElement } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import Avatar from "react-avatar";
import { ROLES } from "@/server/database/schema";
import { IoMdAlert } from "react-icons/io";

export const SettingModule: FC = (): ReactElement => {
  const { data } = clientTrpc.getProfile.useQuery();
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

        {menu === "account" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            {!data?.user?.isPasswordSet && (
              <div className="flex p-2 border-yellow-500 border rounded-lg text-yellow-500 bg-yellow-50 items-center gap-x-4">
                <IoMdAlert className="text-3xl" /> Kata sandi di akun anda belum di atur, segera
                atur kata sandi anda!
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Akun</h1>
                <p>Disini kamu bisa atur akun kamu</p>
              </div>
              <div>
                <Button size="sm" onClick={() => console.log("")} variant="primary">
                  Perbarui Akun
                </Button>
              </div>
            </div>
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
            <FieldText readOnly value={data?.user?.email} label="Email" />
            <FieldText readOnly value={data?.user?.fullname} label="Nama Lengkap" />
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
                <Button size="sm" onClick={() => console.log("")} variant="primary">
                  Perbarui Bisnis
                </Button>
              </div>
            </div>
            {data?.user?.business?.image ? (
              <Image
                src={(data?.user?.business?.image as string) || "/no-image.png"}
                alt="Dashboard"
                className="rounded-lg"
                width={100}
                height={100}
              />
            ) : (
              <Avatar name={data?.user?.business?.name} size="100" className="rounded-lg" />
            )}

            <FieldText readOnly value={data?.user?.business?.name} label="Nama Bisnis" />
            <FieldText
              readOnly
              value={data?.user?.business?.phoneNumber}
              label="Nomor Telepon Bisnis"
            />
            <FieldTextArea label="Alamat Bisnis" readOnly value={data?.user?.business?.address} />
          </div>
        )}
      </div>
    </FormTemplate>
  );
};
