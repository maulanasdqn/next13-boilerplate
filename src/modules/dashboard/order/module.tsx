"use client";
import { Button, DataTable, Modal } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { FC, ReactElement, useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { format } from "date-fns";
import { formatCurrency } from "@/utils";
import { parseAsInteger, parseAsString, useQueryState } from "next-usequerystate";
import { IoPrint } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa6";

export const DashboardOrderModule: FC = (): ReactElement => {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [perPage] = useQueryState("perPage", parseAsInteger.withDefault(10));

  const {
    data: order,
    isLoading,
    refetch,
  } = clientTrpc.getOrder.useQuery({
    search,
    page,
    perPage,
  });

  const { mutate } = clientTrpc.deleteReportTransaction.useMutation();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const data = order?.data;

  type Unpacked<T> = T extends (infer U)[] ? U : T;
  type TData = NonNullable<typeof data>;

  const handleModalDelete = (id: string) => {
    setDeleteModal(true);
    setId(id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const columns = useMemo<ColumnDef<Unpacked<TData>>[]>(
    () => [
      {
        header: "Aksi",
        cell: ({ row }) => {
          return (
            <div className="flex gap-x-2">
              <Button
                href={`/dashboard/report/transaction/update/${row.original?.id}?title=${
                  "Perbarui Data " + row.original?.name
                }`}
                size="sm"
                variant="success"
              >
                <AiFillEdit />
              </Button>
              <Button onClick={() => handleModalDelete(row.original?.id)} size="sm" variant="error">
                <AiFillDelete />
              </Button>
              <Button size="sm" variant="primary">
                <IoPrint />
              </Button>
              <Button size="sm" variant="warning">
                <FaFileExport />
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
        header: "Nama Pesanan",
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
        accessorKey: "price",
        cell: ({ row }) => {
          const value = row.original?.price * row.original?.quantity;
          return formatCurrency(value);
        },
      },
      {
        header: "Total Pembelian",
        accessorKey: "quantity",
      },
      {
        header: "Tanggal Pesanan Dibuat",
        accessorKey: "createdAt",
        cell: ({ getValue }) => {
          const value = new Date(getValue<Date>());
          return format(value, "dd/MM/yyyy");
        },
      },
    ],
    [],
  );

  return (
    <>
      <DataTable
        createLink="/dashboard/order/create?title=Buat Pesanan"
        createLabel="+ Buat Pesanan"
        isLoading={isLoading}
        columns={columns}
        handleSearch={handleSearch}
        data={data || []}
        meta={order?.meta}
      />
      <Modal
        width="200"
        height="100"
        title="Apakah anda yakin ingin menghapus ini?"
        isOpen={deleteModal}
      >
        <div className="flex justify-start gap-x-4 w-full">
          <Button
            onClick={() =>
              mutate(
                { id },
                {
                  onSuccess: () => {
                    refetch();
                    setDeleteModal(false);
                    setId("");
                  },
                },
              )
            }
            variant="error"
          >
            Hapus
          </Button>
          <Button onClick={() => setDeleteModal(false)} variant="cancel">
            Batal
          </Button>
        </div>
      </Modal>
    </>
  );
};
