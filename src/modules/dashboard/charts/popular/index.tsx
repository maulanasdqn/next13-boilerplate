import { FC, ReactElement } from "react";
import Image from "next/image";
import { GrLineChart } from "react-icons/gr";
export const PopularProduck: FC = (): ReactElement => {
  return (
    <section className="w-full rounded-lg bg-white p-4 my-2 h-fit shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <h1 className="text-xl font-semibold ">Produk Popular</h1>
          <span>
            <GrLineChart size={30} className="text-green-500" />
          </span>
        </div>
      </div>
      <div className="w-full pt-8 h-96">
        <div className="flex items-center justify-between w-full">
          <p>Produk</p>
          <p>Penghasilan</p>
        </div>
        <hr className="w-full text-gray-200 my-4" />
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <Image
              src={"/logo.png"}
              alt="image"
              width={100}
              height={100}
              className="max-w-14 md:max-w-28 md:w-20"
            />
            <div className="font-semibold text-xs md:text-base">
              <p>Nama produk</p>
              <p>Kategori</p>
            </div>
          </div>
          <div className="font-semibold text-xs md:text-base">
            <p>Rp. 2.0000.00</p>
          </div>
        </div>
      </div>
    </section>
  );
};
