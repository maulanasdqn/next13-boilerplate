"use client";
import { Button, DataTable } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { FC, ReactElement, useMemo } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { format } from "date-fns";
import { formatCurrency } from "@/utils";

export const DashboardReportTransactionModule: FC = (): ReactElement => {
  const { data, isLoading } = clientTrpc.getReportTransaction.useQuery();

  type Unpacked<T> = T extends (infer U)[] ? U : T;
  type TData = NonNullable<typeof data>;

  const columns = useMemo<ColumnDef<Unpacked<TData>>[]>(
    () => [
      {
        header: "Aksi",
        cell: ({ row }) => {
          return (
            <div className="flex gap-x-2">
              <Button
                href={`/dashboard/report-transaction/${row.original?.id}`}
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
      {
        header: "No",
        accessorKey: "no",
        cell: ({ row }) => row.index + 1,
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Harga Satuan",
        accessorKey: "price",
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return formatCurrency(value);
        },
      },
      {
        header: "Total Harga",
        accessorKey: "total_price",
        cell: ({ getValue }) => {
          const value = getValue<number>();
          return formatCurrency(value);
        },
      },
      {
        header: "Total Terjual",
        accessorKey: "total_selled",
      },
      {
        header: "Tanggal Transaksi",
        accessorKey: "transaction_date",
        cell: ({ getValue }) => {
          const value = new Date(getValue<Date>());
          return format(value, "dd/MM/yyyy");
        },
      },
      {
        header: "Tanggal Dibuat",
        accessorKey: "created_at",
        cell: ({ getValue }) => {
          const value = new Date(getValue<Date>());
          return format(value, "dd/MM/yyyy");
        },
      },
      {
        header: "Tanggal Diperbarui",
        accessorKey: "updated_at",
        cell: ({ getValue }) => {
          const value = new Date(getValue<Date>());
          return format(value, "dd/MM/yyyy");
        },
      },
    ],
    [],
  );

  return (
    <section className="flex w-full h-full min-h-screen">
      <DataTable
        isLoading={isLoading}
        createLink="/dashboard/report/transaction/create?title=Tambah Data Transaksi"
        columns={columns}
        data={data || []}
      />
    </section>
  );
};
