"use client";
import { FC, ReactElement, useState } from "react";
import Image from "next/image";
import { Button, FieldText, Modal } from "@/components";

export const DashboardModule: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex w-full h-screen overflow-hidden items-center justify-start flex-col">
      <Image src="/dashboard.png" alt="Dashboard" width={600} height={600} />
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="sm:text-2xl md:text-3xl text-1xl font-bold text-gray-700">
          Nampaknya Anda belum mempunyai bisnis
        </h1>
        <div>
          <Button onClick={() => setIsOpen(true)}>Buat Bisnis Sekarang</Button>
        </div>
      </div>
      <Modal width="400" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-y-4 items-start">
          <h1 className="sm:text-2xl md:text-3xl text-1xl font-bold text-gray-700">
            Buat Bisnis Baru
          </h1>
          <FieldText placeholder="Masukkan Nama Bisnis" label="Nama Bisnis" />
          <FieldText placeholder="Masukkan Nomor Telepon" label="Nomor Telepon" />
          <div className="flex gap-x-2">
            <Button onClick={() => setIsOpen(false)}>Buat Bisnis</Button>
            <Button variant="cancel" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
