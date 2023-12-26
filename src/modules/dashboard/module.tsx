"use client";
import { FC, ReactElement, useState } from "react";
import Image from "next/image";
import { Button, ControlledFieldText, Modal } from "@/components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientTrpc } from "@/libs/trpc/client";
import { useSession } from "next-auth/react";

const VSBusiness = z.object({
  name: z.string().min(1, { message: "Nama bisnis Wajib diisi" }),
  phoneNumber: z.string().min(1, { message: "Nomor telepon Wajib diisi" }),
  address: z.string().optional(),
});

export const DashboardModule: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = clientTrpc.createBusiness.useMutation();
  const { data: session } = clientTrpc.getProfile.useQuery();
  const { update } = useSession();

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<z.infer<typeof VSBusiness>>({
    mode: "all",
    resolver: zodResolver(VSBusiness),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        ...data,
        ownerId: session?.user?.id as string,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          update({
            ...session,
            user: {
              ...session?.user,
              business: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                ownerId: session?.user?.id,
                address: data.address,
              },
            },
          });
        },
      },
    );
  });

  return (
    <section className="flex w-full h-screen overflow-hidden items-center justify-start flex-col">
      {session?.user?.business?.name ? (
        <div className="flex items-start justify-start w-full">
          <h1 className="text-2xl font-medium">{session?.user?.business?.name}</h1>
        </div>
      ) : (
        <>
          <Image src="/dashboard.png" alt="Dashboard" width={600} height={600} />
          <div className="flex flex-col gap-y-4 items-center">
            <h1 className="sm:text-2xl md:text-3xl text-1xl font-bold text-gray-700">
              Nampaknya Anda belum mempunyai bisnis
            </h1>
            <p>
              Anda perlu membuat bisnis terlebih dahulu untuk bisa menggunakan fitur aplikasi ini
            </p>
            <div>
              <Button onClick={() => setIsOpen(true)}>Buat Bisnis Sekarang</Button>
            </div>
          </div>
          <Modal width="400" isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <form onSubmit={onSubmit} className="flex flex-col gap-y-4 items-start">
              <h1 className="sm:text-2xl md:text-3xl text-1xl font-bold text-gray-700">
                Buat Bisnis Baru
              </h1>
              <ControlledFieldText
                control={control}
                message={errors?.name?.message}
                status={errors?.name?.message ? "error" : "none"}
                name="name"
                placeholder="Masukkan Nama Bisnis"
                label="Nama Bisnis"
              />
              <ControlledFieldText
                control={control}
                name="phoneNumber"
                placeholder="Masukkan Nomor Telepon"
                label="Nomor Telepon"
                message={errors?.phoneNumber?.message}
                status={errors?.phoneNumber?.message ? "error" : "none"}
              />
              <div className="flex gap-x-2">
                <Button disabled={!isValid} type="submit">
                  Buat Bisnis
                </Button>
                <Button variant="cancel" onClick={() => setIsOpen(false)}>
                  Batal
                </Button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </section>
  );
};
