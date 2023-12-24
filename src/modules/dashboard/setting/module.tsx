"use client";
import { FieldText, FormTemplate } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import Link from "next/link";
import { FC, ReactElement } from "react";
import Image from "next/image";

export const SettingModule: FC = (): ReactElement => {
  const { data } = clientTrpc.getProfile.useQuery();
  return (
    <FormTemplate>
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg gap-y-4 w-[240px]">
          <Link
            className="text-gray-600 font-semibold p-2 rounded-lg"
            href="/dashboard/setting/account"
          >
            Pengaturan Akun
          </Link>
          <Link
            className="text-gray-600 font-semibold p-2 rounded-lg"
            href="/dashboard/setting/account"
          >
            Pengaturan Bisnis
          </Link>
        </div>
        <div className="flex flex-col gap-y-6 w-full h-full">
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold">Pengaturan Akun</h1>
            <p>Disini kamu bisa atur akun kamu</p>
          </div>
          <Image
            src={data?.user?.image as string}
            alt="Dashboard"
            className="rounded-full"
            width={100}
            height={100}
          />
          <FieldText readOnly value={data?.user?.email} label="Email" />
          <FieldText readOnly value={data?.user?.fullname} label="Nama Lengkap" />
        </div>
      </div>
    </FormTemplate>
  );
};
