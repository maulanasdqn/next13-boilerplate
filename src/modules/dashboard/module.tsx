"use client";
import { FC, ReactElement, useState } from "react";
import Image from "next/image";
import { Button, ControlledFieldText, Modal } from "@/components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientTrpc } from "@/libs/trpc/client";
import { useSession } from "next-auth/react";
import { notifyMessage } from "@/utils";
import { useRouter } from "next/navigation";
import { CardChart, LineChart, PopularProduck } from "./charts";
import { ProductBar } from "./charts/bar-chart/product";
import { ProductViewBar } from "./charts/bar-chart/earning";
import { ROLES } from "@/server/database/schema";
import { AreaChartAdmin } from "./charts/admin/bar-chart/most-user-transaction";
import { CardChartAdmin, LineChartAdmin } from "./charts/admin";
import { BarChartAdmin } from "./charts/admin/bar-chart/area-chart";

const VSBusiness = z.object({
  name: z.string().min(1, { message: "Nama bisnis Wajib diisi" }),
  phoneNumber: z.string().min(1, { message: "Nomor telepon Wajib diisi" }),
  address: z.string().optional(),
});

export const DashboardModule: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = clientTrpc.createBusiness.useMutation();
  const { data: session, refetch } = clientTrpc.getProfile.useQuery();
  const { update } = useSession();
  const router = useRouter();

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
        onSuccess: async () => {
          setIsOpen(false);
          await update({
            info: "create-business",
          });
          notifyMessage({ type: "success", message: "Bisnis berhasil dibuat" });
          refetch();
          router.refresh();
        },
        onError: (err) => {
          notifyMessage({ type: "error", message: err?.message });
        },
      },
    );
  });

  return (
    <section className="flex w-full min-h-screen items-center justify-start flex-col">
      {session?.user?.role?.name === ROLES.ADMIN && (
        <>
          <div className="flex flex-col items-start justify-start w-full">
            {/*ini chart admin */}
            <div className="w-full">
              <CardChartAdmin />
            </div>
            <div className="flex flex-col md:flex-row gap-x-2 w-full">
              <div className="w-full md:w-1/2">
                <AreaChartAdmin />
              </div>
              <div className="w-full md:w-1/2">
                <BarChartAdmin />
              </div>
            </div>
          </div>
        </>
      )}
      {session?.user?.business?.name ? (
        <div className="flex flex-col items-start justify-start w-full">
          <h1 className="text-2xl font-medium">{session?.user?.business?.name}</h1>
          {/*ini chart */}
          <div className="w-full">
            <CardChart />
          </div>
          <div className="flex flex-col md:flex-row gap-x-2 w-full">
            <div className="w-full md:w-1/2">
              <LineChart />
            </div>
            <div className="w-full md:w-1/2">
              <ProductViewBar />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-x-2 w-full">
            <div className="w-full md:w-1/2">
              <ProductBar />
            </div>
            <div className="w-full md:w-1/2">
              <PopularProduck />
            </div>
          </div>
        </div>
      ) : (
        <>
          {session?.user?.role?.name !== ROLES.ADMIN && (
            <>
              <Image src="/dashboard.png" alt="Dashboard" width={600} height={600} />
              <div className="flex flex-col gap-y-4 items-center">
                <h1 className="sm:text-2xl md:text-3xl text-1xl font-bold text-gray-700">
                  Nampaknya Anda belum mempunyai bisnis
                </h1>
                <p>
                  Anda perlu membuat bisnis terlebih dahulu untuk bisa menggunakan fitur aplikasi
                  ini
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
        </>
      )}
    </section>
  );
};
