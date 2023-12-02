"use client";

import { FC, ReactElement } from "react";
import Image from "next/image";

export const DashboardModule: FC = (): ReactElement => {
  return (
    <section className="flex w-full h-full items-center justify-center flex-col">
      <Image src="/dashboard.png" alt="Dashboard" width={600} height={600} />
      <h1 className="text-3xl font-bold text-gray-700">Ayo bangun bisnis bersama kami</h1>
    </section>
  );
};
