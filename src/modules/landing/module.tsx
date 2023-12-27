"use client";
import { Button, NavbarLanding } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { FC, Fragment, ReactElement } from "react";
import Image from "next/image";
import { TbReportAnalytics } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { FaLaptopFile } from "react-icons/fa6";

export const LandingModule: FC = (): ReactElement => {
  const { data } = clientTrpc.getProfile.useQuery();
  const card = [
    {
      icon: <TbReportAnalytics size={80} />,
      desc: "Laporan intuitif dan informatif",
    },
    {
      icon: <FaLaptopFile size={80} />,
      desc: "Tampilan dan antar muka yang mudah di operasikan",
    },
    {
      icon: <TbTruckDelivery size={80} />,
      desc: "Terintegrasi pengiriman dan pembayaran",
    },
  ];

  return (
    <Fragment>
      <NavbarLanding />
      <section className="flex flex-col lg:flex-row px-10 py-24 bg-primary h-auto lg:w-full w-screen gap-x-8">
        <div className="flex lg:w-1/2 w-full justify-center items-center">
          <Image src="/landing.png" alt="landing" width={500} height={500} />
        </div>
        <div className="flex flex-col lg:w-1/2 w-fit gap-y-8 justify-center ">
          <div className="xl:flex hidden lg:gap-x-4 w-full">
            <span className="rounded-full border-white border-2 md:p-3 p-2 w-fit text-white ">
              Pelaporan
            </span>
            <span className="rounded-full border-white border-2 md:p-3 p-2 w-fit text-white">
              Manajemen Pelanggan
            </span>
            <span className="rounded-full border-white border-2 md:p-3 p-2 w-fit text-white">
              Manajemen Produk
            </span>
          </div>
          <span className="lg:text-6xl text-4xl text-white lg:text-left text-center font-bold">
            Solusi POS Terbaik untuk UMKM Kamu!
          </span>
          <p className="text-lg text-white lg:text-left text-justify">
            Apakah Kamu pemilik UMKM yang berjuang untuk mengelola bisnis dengan lebih efisien? Kami
            memahami bahwa setiap transaksi dan pelanggan sangat berharga bagi Kamu. Oleh karena
            itu, kami hadir dengan solusi POS yang dirancang khusus untuk memenuhi kebutuhan unik
            UMKM Anda.
          </p>
          {data ? (
            <div>
              <Button variant="cancel" href="/dashboard?title=Dashboard">
                Kembali Ke Dashboard
              </Button>
            </div>
          ) : (
            <div className="xl:w-1/2 w-full justify-start md:justify-center lg:justify-start flex gap-x-3">
              <Button>Mulai Bisnis</Button>
              <Button variant="cancel">Fitur Kami</Button>
            </div>
          )}
        </div>
      </section>

      <section className="flex xl:flex-row flex-col px-10 py-24 bg-gray-100 h-auto lg:w-full w-screen">
        <div className="flex flex-col  xl:w-1/2 w-full">
          <span className="text-primary font-bold lg:text-6xl text-4xl text-left py-2 xl:py-6">
            Solusi Yang Kami Tawarkan
          </span>

          <span className="text-2xl md:text-xl text-lg text-black text-justify xl:w-2/3 w-fit pb-8">
            Berbagai solusi yang telah kami sediakan membantu Kamu, Tim dan Bisnismu lebih gesit.
          </span>
        </div>
        <div className="lg:grid grid-cols-3 gap-4 xl:w-1/2 w-full">
          {card.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-full h-full text-white justify-center items-center font-bold text-center text-lg bg-primary bg-opacity-90 hover:bg-opacity-70 rounded-md p-8 my-2"
            >
              {item.icon}

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};
