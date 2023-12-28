"use client";
import { Button, DataTable, Modal } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { FC, ReactElement, useMemo, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { format } from "date-fns";
import { parseAsInteger, parseAsString, useQueryState } from "next-usequerystate";

export const DashboardCustomerModule: FC = (): ReactElement => {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [perPage] = useQueryState("perPage", parseAsInteger.withDefault(10));

  const {
    data: customers,
    isLoading,
    refetch,
  } = clientTrpc.getCustomer.useQuery({
    search,
    page,
    perPage,
  });

  const { mutate } = clientTrpc.deleteReportTransaction.useMutation();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const data = customers?.data;

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
              <Button onClick={() => handleModalDelete(row.original?.id)} size="sm" variant="error">
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
        header: "Nama Pelanggan",
        accessorKey: "name",
      },
      {
        header: "Tanggal Dibuat",
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
        isLoading={isLoading}
        columns={columns}
        handleSearch={handleSearch}
        data={data || []}
        meta={customers?.meta}
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
