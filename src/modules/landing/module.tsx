"use client";
import { Button, NavbarLanding } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { FC, Fragment, ReactElement } from "react";

export const LandingModule: FC = (): ReactElement => {
  const { data } = clientTrpc.getProfile.useQuery();
  return (
    <Fragment>
      <NavbarLanding />
      <section className="flex px-10 py-24 bg-primary h-auto w-full">
        <div className="flex w-1/2"></div>
        <div className="flex flex-col w-1/2 gap-y-8">
          <div className="flex gap-x-4 w-full">
            <span className="rounded-full border-white border-2 md:p-3 p-2 w-fit text-white">
              Pelaporan
            </span>
            <span className="rounded-full border-white border-2 md:p-3 p-2 w-fit text-white">
              Manajemen Pelanggan
            </span>
            <span className="rounded-full border-white border-2 md:p-3 p-2 w-fit text-white">
              Manajemen Produk
            </span>
          </div>
          <span className="text-6xl text-white text-left font-bold">
            Solusi POS Terbaik untuk UMKM Anda!
          </span>
          <p className="text-lg text-white text-left">
            Apakah Anda pemilik UMKM yang berjuang untuk mengelola bisnis Anda dengan lebih efisien?
            Kami memahami bahwa setiap transaksi dan pelanggan sangat berharga bagi Anda. Oleh
            karena itu, kami hadir dengan solusi POS yang dirancang khusus untuk memenuhi kebutuhan
            unik UMKM Anda.
          </p>
          {data ? (
            <div>
              <Button variant="cancel" href="/dashboard?title=Dashboard">
                Kembali Ke Dashboard
              </Button>
            </div>
          ) : (
            <div className="w-1/2 flex gap-x-3">
              <Button>Mulai Bisnis</Button>
              <Button variant="cancel">Fitur Kami</Button>
            </div>
          )}
        </div>
      </section>

      <section className="flex px-10 py-24 bg-gray-100 h-auto w-full">
        <div className="flex flex-col gap-y-6 w-1/2">
          <span className="text-primary font-bold text-6xl">
            Kembangkan Bisnis anda bersama kami
          </span>

          <p className="text-lg text-black text-left w-2/3">
            Bisnis Anda akan dimudahkan dengan berbagai fitur unggulan yang kami sediakan.
          </p>
        </div>
        <div className="flex flex-col w-1/2 gap-y-8"></div>
      </section>
    </Fragment>
  );
};
