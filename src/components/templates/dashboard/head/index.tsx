"use client";
import { Button } from "@/components";
import { useSearchParams } from "next/navigation";
import { FC, ReactElement } from "react";

export const DashboardHeadTemplate: FC = (): ReactElement => {
  const re = /Tambah|Edit|Ubah|Rubah/gi;
  const searcParams = useSearchParams();
  const title = searcParams.get("title");
  return (
    <div className="flex w-full justify-between items-center mb-5">
      <h1 className="sm:text-4xl text-2xl font-bold">{title}</h1>
      {title?.match(re) && (
        <Button onClick={() => window.history.back()} size="sm" variant="cancel">
          Kembali
        </Button>
      )}
    </div>
  );
};
