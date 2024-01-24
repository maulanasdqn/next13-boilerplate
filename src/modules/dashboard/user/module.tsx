"use client";
import { Button, DataTable, Modal } from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { ColumnDef } from "@tanstack/react-table";
import { FC, ReactElement, useMemo, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { format } from "date-fns";
import { parseAsInteger, parseAsString, useQueryState } from "next-usequerystate";
import { notifyMessage } from "@/utils";

export const DashboardUserModule: FC = (): ReactElement => {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault(""));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [perPage] = useQueryState("perPage", parseAsInteger.withDefault(5));

  const {
    data: users,
    isLoading,
    refetch,
  } = clientTrpc.getUser.useQuery({
    search,
    page,
    perPage,
  });

  const { mutate } = clientTrpc.deleteUser.useMutation();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const data = users?.data;

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
                href={`/dashboard/user/update/${row.original?.id}?title=Perbarui data pengguna`}
                size="sm"
                variant="success"
              >
                <AiFillEdit />
              </Button>
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
        header: "Nama Lengkap",
        accessorKey: "fullname",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Hak Akses",
        accessorKey: "role.name",
        accessorFn: (row) => row?.role?.name || "-",
      },

      {
        header: "Status",
        accessorKey: "isActive",
        cell: ({ getValue }) => {
          const value = getValue<boolean>();
          return value ? "Aktif" : "Tidak Aktif";
        },
      },

      {
        header: "Tanggal Dibuat",
        accessorKey: "createdAt",
        cell: ({ getValue }) => {
          const value = new Date(getValue<Date>());
          return format(value, "dd/MM/yyyy");
        },
      },
      {
        header: "Tanggal Diperbarui",
        accessorKey: "updatedAt",
        cell: ({ getValue }) => {
          const value = new Date(getValue<Date>());
          return format(value, "dd/MM/yyyy");
        },
      },
    ],
    [],
  );

  return (
    <section className="flex w-full h-full">
      <DataTable
        createLabel="+ Buat Pengguna"
        isLoading={isLoading}
        createLink="/dashboard/user/create?title=Tambah Data Pengguna"
        columns={columns}
        handleSearch={handleSearch}
        data={data || []}
        meta={users?.meta}
      />
      <Modal
        width="440"
        height="100"
        title="Apakah anda yakin ingin hapus Laporan Transaksi?"
        onClose={() => setDeleteModal(false)}
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
                    notifyMessage({ type: "success", message: "Pengguna Berhasil Dihapus" });
                  },

                  onError: (err) => {
                    notifyMessage({ type: "error", message: err?.message });
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
    </section>
  );
};
