"use client";

import { Button, DataTable } from "@/components";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { FC, ReactElement, useMemo } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type TData = {
  id: string;
  name: string;
  amount: string;
  date: Date;
};

export const DashboardReportTransactionModule: FC = (): ReactElement => {
  const searchParams = useSearchParams();

  const params = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    amount: searchParams.get("amount"),
    date: searchParams.get("date"),
    search: searchParams.get("search"),
  };

  const data: Array<TData> = [
    {
      id: "qweqweqwe",
      name: "Pengeluaran",
      amount: "Rp. 100.000",
      date: new Date(),
    },
    {
      id: "qweqweqwe",
      name: "Pemasukan",
      amount: "Rp. 100.000",
      date: new Date(),
    },
  ];

  const columns = useMemo<ColumnDef<TData>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Amount",
        accessorKey: "amount",
      },
      {
        header: "Tanggal Dibuat",
        accessorKey: "date",
        cell: ({ getValue }) => {
          const value = getValue<Date>();
          return value.toLocaleDateString();
        },
      },
      {
        header: "Aksi",
        cell: ({ row }) => {
          return (
            <div className="flex gap-x-2">
              <Button
                href={`/dashboard/report-transaction/${row.original.id}`}
                size="sm"
                variant="success"
              >
                <AiFillEdit />
              </Button>
              <Button size="sm" variant="error">
                <AiFillDelete />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <section className="flex w-full h-screen">
      <DataTable columns={columns} data={data} />
    </section>
  );
};
