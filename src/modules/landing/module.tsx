"use client";
import { Button, Footer, NavbarLanding } from "@/components";
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
      desc: "Terintegrasi pengiriman dan pembayaran / Coming Soon",
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
              <Button href="/auth/register">Mulai Bisnis</Button>
              <Button variant="cancel">Fitur Kami</Button>
            </div>
          )}
        </div>
      </section>

      <section
        id="service"
        className="flex xl:flex-row flex-col px-10 py-24 bg-gray-100 h-auto lg:w-full w-screen"
      >
        <div className="flex flex-col  xl:w-1/2 w-full">
          <span className="text-primary font-bold lg:text-6xl text-4xl text-left py-2 xl:py-6">
            Solusi Yang Kami Tawarkan
          </span>

          <span className="text-2xl md:text-xl  text-black text-justify xl:w-2/3 w-fit pb-8">
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
      <section
        id="about"
        className="flex flex-col px-10 py-24 bg-gray-100 h-auto lg:w-full w-screen"
      >
        <div className="font-bold text-primary text-4xl  lg:text-6xl text-left py-2 xl:py-6">
          <h1 className="text-center mb-4 lg:text-start lg:mb-0">Tentang Kami</h1>
        </div>

        <div className="flex lg:flex-row flex-col gap-y-4 lg:gap-x-8 items-center">
          <div className="text-justify w-full lg:w-1/2 text-lg">
            <p>
              Kami bangga menjadi bagian dari perjalanan Anda untuk mencapai keberhasilan. Sejak
              didirikan, kami telah berkomitmen untuk mendukung UMKM (Usaha Mikro, Kecil, dan
              Menengah) dengan menyediakan solusi kreatif dan inovatif untuk membantu bisnis Anda
              berkembang.
            </p>
            <p>
              Kami terdiri dari individu yang berkomitmen tinggi untuk memberikan pelayanan terbaik
              kepada pelanggan kami. Dengan pengalaman yang luas dalam berbagai industri, kami
              memahami tantangan yang dihadapi oleh UMKM dan siap memberikan dukungan yang
              dibutuhkan.
            </p>
            <div className="mt-8">
              <Button>More About Us</Button>
            </div>
          </div>
          <div className="relative lg:right-0 lg:pl-40 3xl:pt-80 2xl:pt-60 lg:pt-0 z-10 w-auto">
            <Image
              src="/about.jpg"
              alt="about"
              width="636"
              height="670"
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="flex xl:flex-row flex-col px-10 lg:py-24 py-10 bg-gray-100 h-auto lg:w-full w-screen "
      >
        <div className="text-2xl lg:text-7xl font-bold mx-auto">
          <h1 className="text-center">
            Kami akan membuat <span className="text-primary">pengelolaan bisnismu</span> lebih mudah
          </h1>
        </div>
      </section>

      <section className="flex xl:flex-row flex-col px-10 py-24 bg-gray-100 h-auto lg:w-full w-screen ">
        <div className="flex lg:flex-row flex-col w-full py-8 lg:px-10 px-4 gap-y-2 bg-primary items-center justify-between rounded-xl ">
          <div className="text-3xl lg:text-6xl font-bold text-white w-3/4">
            Lihat bagaimana bisnis kamu bertumbuh
          </div>
          <Button>Hubungi Kami</Button>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};
