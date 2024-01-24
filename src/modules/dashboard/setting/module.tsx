"use client";
import {
  Button,
  ControlledFieldSelect,
  ControlledFieldText,
  ControlledFieldTextArea,
  DataTable,
  FormTemplate,
  Modal,
} from "@/components";
import { clientTrpc } from "@/libs/trpc/client";
import { FC, ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "react-avatar";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { PERMISSIONS } from "@/server/database/schema";
import { IoMdAlert } from "react-icons/io";
import { useForm } from "react-hook-form";
import { hasCommonElements, notifyMessage } from "@/utils";
import { TUser } from "@/entities";
import { useSession } from "next-auth/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export const SettingModule: FC<{ session: TUser }> = ({ session }): ReactElement => {
  const { data: detailUser } = clientTrpc.getDetailUser.useQuery(session?.id as string);
  const { data: password, refetch } = clientTrpc.getPassword.useQuery();
  const { mutate: setPassword } = clientTrpc.updatePassword.useMutation();
  const { mutate: updateUser } = clientTrpc.updateUser.useMutation();
  const { update } = useSession();
  const { data: roles } = clientTrpc.getRoleByBusinessId.useQuery();
  const { data: users } = clientTrpc.getUserByBusinessId.useQuery();
  const { data: paymentMethods } = clientTrpc.getPaymentMethod.useQuery();

  const [isAccountEdited, setIsAccountEdited] = useState(false);
  const [isBusinessEdited, setIsBusinessEdited] = useState(false);
  const [isModalPaymentOpen, setIsModalPaymentOpen] = useState(false);
  const [isModalRoleOpen, setIsModalRoleOpen] = useState(false);

  const router = useRouter();

  const { control, reset, watch } = useForm();

  useEffect(() => {
    reset(session);
  }, [session, reset]);

  const params = useSearchParams();

  const menu = params?.get("menu");

  const className = (url: string) =>
    clsx({
      "text-gray-600 font-semibold p-2 rounded-lg bg-gray-100": menu === url,
      "text-gray-600 font-semibold p-2 rounded-lg": menu !== url,
      "text-gray-300 font-semibold p-2 rounded-lg": hasCommonElements(
        session?.role?.permissions || [],
        [PERMISSIONS.HAS_BUSINESS],
      ),
    });

  return (
    <FormTemplate>
      <div className="flex w-full gap-x-6 min-h-screen h-full">
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg gap-y-4 w-[240px]">
          <Link
            className={className("account")}
            href="/dashboard/setting?menu=account&title=Pengaturan"
          >
            Akun
          </Link>
          {hasCommonElements(session?.role?.permissions || [], [PERMISSIONS.HAS_BUSINESS]) && (
            <>
              <Link
                className={className("business")}
                href="/dashboard/setting?menu=business&title=Pengaturan"
              >
                Bisnis
              </Link>
              <Link
                className={className("payments")}
                href="/dashboard/setting?menu=payments&title=Pengaturan"
              >
                Pembayaran
              </Link>
              <Link
                className={className("members")}
                href="/dashboard/setting?menu=members&title=Pengaturan"
              >
                Anggota
              </Link>
            </>
          )}
          {hasCommonElements(session?.role?.permissions || [], [
            PERMISSIONS.ROLE_READ,
            PERMISSIONS.IS_OWNER,
          ]) && (
            <Link
              className={className("roles")}
              href="/dashboard/setting?menu=roles&title=Pengaturan"
            >
              Hak Akses
            </Link>
          )}
        </div>

        {menu === "account-password" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Atur Kata sandi</h1>
              </div>
            </div>
            <form className="flex flex-col gap-y-4">
              <ControlledFieldText
                size="sm"
                control={control}
                name="password"
                type="password"
                label="Kata Sandi"
                placeholder="Masukkan Kata sandi anda"
                hint="Kata sandi harus terdiri dari 8 karakter"
                status={watch("password")?.length < 8 ? "error" : "none"}
                message="Kata sandi kurang dari 8 karakter"
              />

              <ControlledFieldText
                size="sm"
                type="password"
                control={control}
                name="confirm_password"
                label="Konfirmasi Kata Sandi"
                placeholder="Masukkan konfirmasi kata sandi anda"
                status={watch("password") !== watch("confirm_password") ? "error" : "none"}
                message="Kata sandi tidak sama"
              />
              <div>
                <Button
                  size="sm"
                  disabled={
                    watch("password") !== watch("confirm_password") || watch("password")?.length < 8
                  }
                  onClick={() =>
                    setPassword(
                      { password: watch("password") },
                      {
                        onSuccess: () => {
                          refetch();
                          router.push("/dashboard/setting?title=Pengaturan&menu=account");
                          notifyMessage({ type: "success", message: "Kata sandi berhasil dibuat" });
                        },

                        onError: (err) => {
                          notifyMessage({ type: "error", message: err?.message });
                        },
                      },
                    )
                  }
                  variant="primary"
                  type="button"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        )}

        {menu === "account" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            {!password && (
              <div className="flex p-2 border-yellow-500 border rounded-lg text-yellow-500 bg-yellow-50 items-center gap-x-1">
                <IoMdAlert className="text-3xl" /> Kata sandi akun anda belum di atur
                <Link
                  href="/dashboard/setting?title=Pengaturan&menu=account-password"
                  className="underline"
                >
                  Klik disini
                </Link>
                untuk mengatur nya sekarang
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Akun</h1>
                <p>Disini kamu bisa atur akun kamu</p>
              </div>
              <div>
                {isAccountEdited ? (
                  <Button
                    size="sm"
                    onClick={() => setIsAccountEdited(false)}
                    type="button"
                    variant="cancel"
                  >
                    Batal
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsAccountEdited(true)}
                    variant="primary"
                    type="button"
                  >
                    Perbarui Akun
                  </Button>
                )}
              </div>
            </div>
            <form className="flex flex-col gap-y-4">
              {session.image ? (
                <Image
                  src={session.image as string}
                  alt="Dashboard"
                  className="rounded-lg"
                  width={100}
                  height={100}
                />
              ) : (
                <Avatar name={session.fullname} size="100" className="rounded-lg" />
              )}
              <ControlledFieldText
                size="sm"
                control={control}
                name="email"
                disabled
                label="Email"
              />
              <ControlledFieldText
                size="sm"
                control={control}
                name="fullname"
                disabled={!isAccountEdited}
                label="Nama Lengkap"
              />
              <ControlledFieldText
                size="sm"
                control={control}
                name="role.name"
                label="Hak Akses"
                disabled
              />
              {isAccountEdited && (
                <div>
                  <Button
                    size="sm"
                    onClick={async () => {
                      updateUser(
                        {
                          id: session.id as string,
                          fullname: watch("fullname"),
                          email: session?.email as string,
                          password: detailUser?.password as string,
                        },
                        {
                          onSuccess: () => {
                            refetch();
                            update({ info: "change-user-data" });
                            router.push("/dashboard/setting?title=Pengaturan&menu=account");
                            router.refresh();
                            setIsAccountEdited(false);
                            notifyMessage({ type: "success", message: "Akun berhasil diperbarui" });
                          },
                        },
                      );
                    }}
                    variant="primary"
                    type="button"
                  >
                    Simpan
                  </Button>
                </div>
              )}
            </form>
          </div>
        )}

        {menu === "business" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            {!session.business?.address && (
              <div className="flex p-2 border-yellow-500 border rounded-lg text-yellow-500 bg-yellow-50 items-center gap-x-4">
                <IoMdAlert className="text-3xl" /> Alamat bisnis anda belum di atur
              </div>
            )}
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Bisnis</h1>
                <p>Disini kamu bisa atur bisnis kamu</p>
              </div>
              <div>
                {isBusinessEdited ? (
                  <Button
                    size="sm"
                    onClick={() => setIsBusinessEdited(false)}
                    type="button"
                    variant="cancel"
                  >
                    Batal
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsBusinessEdited(true)}
                    variant="primary"
                    type="button"
                    disabled={
                      !hasCommonElements(session?.role.permissions as Array<string>, [
                        PERMISSIONS.IS_OWNER,
                      ])
                    }
                  >
                    Perbarui Bisnis
                  </Button>
                )}
              </div>
            </div>
            {session?.business?.image ? (
              <Image
                src={session?.business?.image as string}
                alt="Dashboard"
                className="rounded-lg"
                width={100}
                height={100}
              />
            ) : (
              <Avatar name={session?.business?.name} size="100" className="rounded-lg" />
            )}

            <ControlledFieldText
              control={control}
              name={"business.name"}
              disabled={!isBusinessEdited}
              label="Nama Bisnis"
            />
            <ControlledFieldText
              control={control}
              name={"business.phoneNumber"}
              disabled
              label="Nomor Telepon Bisnis"
            />
            <ControlledFieldTextArea
              control={control}
              name={"business.address"}
              disabled={!isBusinessEdited}
              label="Alamat Bisnis"
            />
          </div>
        )}

        {menu === "payments" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Pembayaran</h1>
                <p>Disini kamu bisa atur metode pembayaran</p>
              </div>
              <div>
                <Button
                  onClick={() => setIsModalPaymentOpen(true)}
                  size="sm"
                  type="button"
                  variant="cancel"
                >
                  + Tambah Metode Pembayaran
                </Button>
              </div>
            </div>
            <DataTable
              data={paymentMethods?.data || []}
              columns={[
                {
                  header: "Aksi",
                },
                {
                  header: "Nama Penyedia",
                  accessorKey: "providerName",
                },
                {
                  header: "Nama Pengguna",
                  accessorKey: "accountName",
                },
                {
                  header: "Nomor Akun",
                  accessorKey: "accountNumber",
                },
              ]}
            />
          </div>
        )}

        {menu === "members" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Anggota</h1>
                <p>Disini kamu bisa atur anggota dari bisnis kamu</p>
              </div>
              <div>
                <Button size="sm" type="button" variant="cancel">
                  + Tambah Anggota
                </Button>
              </div>
            </div>
            <DataTable
              data={users?.data || []}
              meta={users?.meta}
              columns={[
                {
                  header: "Nama",
                  accessorKey: "fullname",
                },
                {
                  header: "Email",
                  accessorKey: "email",
                },
                {
                  header: "Hak Akses",
                  accessorKey: "role.name",
                },
                {
                  header: "Aksi",
                  cell: ({ row }) => {
                    const value = row.original;
                    return (
                      <div className="flex gap-x-2">
                        <Button size="sm" type="button" variant="cancel">
                          <AiFillEdit />
                        </Button>
                        <Button size="sm" variant="error">
                          <AiFillDelete />
                        </Button>
                      </div>
                    );
                  },
                },
              ]}
            />
          </div>
        )}

        {menu === "roles" && (
          <div className="flex flex-col gap-y-6 w-full h-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">Pengaturan Hak Akses</h1>
                <p>Disini kamu bisa atur metode hak akses member bisnis kamu</p>
              </div>
              <div>
                <Button
                  onClick={() => setIsModalRoleOpen(true)}
                  size="sm"
                  type="button"
                  variant="cancel"
                >
                  + Tambah Hak Akses
                </Button>
              </div>
            </div>
            <DataTable
              data={roles?.data || []}
              meta={roles?.meta}
              columns={[
                {
                  header: "Nama Hak Akses",
                  accessorKey: "name",
                },
                {
                  header: "Permission",
                  accessorKey: "permissions",
                  accessorFn: ({ permissions }) => {
                    return permissions?.map((item) => item).join(", ");
                  },
                },
                {
                  header: "Aksi",
                  cell: ({ row }) => {
                    const value = row.original;
                    return (
                      <div className="flex gap-x-2">
                        <Button size="sm" type="button" variant="cancel">
                          <AiFillEdit />
                        </Button>
                        <Button size="sm" variant="error">
                          <AiFillDelete />
                        </Button>
                      </div>
                    );
                  },
                },
              ]}
            />
          </div>
        )}
      </div>

      <Modal
        title="Tambah Metode Pembayaran"
        isOpen={isModalPaymentOpen}
        width="440"
        height="320"
        onClose={() => setIsModalPaymentOpen(false)}
      >
        <form className="flex flex-col h-full gap-y-4 mt-4 p-3">
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan Nama Penyedia"
            control={control}
            name="providerName"
            label="Nama Penyedia"
          />
          <ControlledFieldText
            size="sm"
            type="text"
            placeholder="Masukkan Nama Akun"
            control={control}
            name="accountName"
            label="Nama Akun"
          />
          <ControlledFieldText
            size="sm"
            type="number"
            placeholder="Masukkan Nomor Akun"
            control={control}
            name="accountNumber"
            label="Nomor Akun"
          />
          <div className="flex gap-x-4">
            <Button size="sm" variant="primary">
              Simpan
            </Button>
            <Button onClick={() => setIsModalPaymentOpen(false)} size="sm" variant={"cancel"}>
              Batal
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Tambah Hak Akses"
        isOpen={isModalRoleOpen}
        width="440"
        height="220"
        onClose={() => setIsModalRoleOpen(false)}
      >
        <form className="flex flex-col h-full gap-y-4 mt-4 p-3">
          <ControlledFieldText
            size="sm"
            placeholder="Masukkan Nama Hak Akses"
            control={control}
            name="name"
            label="Nama Hak Akses"
          />
          <ControlledFieldSelect
            options={Object.values(PERMISSIONS)
              .filter(
                (x) =>
                  ![
                    "Is Admin",
                    "Is Owner",
                    "Is Member",
                    "Has Business",
                    "Read Role",
                    "Create Role",
                    "Update Role",
                    "Delete Role",
                    "Detail Role",
                    "Read User",
                    "Create User",
                    "Update User",
                    "Delete User",
                    "Detail User",
                  ].includes(x),
              )
              .map((x) => ({
                label: x,
                value: x,
              }))}
            size="sm"
            isMulti
            placeholder="Pilih Permission"
            control={control}
            name="permissions"
            label="Permission"
          />
          <div className="flex gap-x-4">
            <Button size="sm" variant="primary">
              Simpan
            </Button>
            <Button onClick={() => setIsModalRoleOpen(false)} size="sm" variant={"cancel"}>
              Batal
            </Button>
          </div>
        </form>
      </Modal>
    </FormTemplate>
  );
};
