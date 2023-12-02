import { FC, ReactElement, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { IoMdBasket } from "react-icons/io";
import { AiFillBook, AiFillCaretDown, AiFillMoneyCollect } from "react-icons/ai";
import { HiUsers } from "react-icons/hi2";
import Link from "next/link";

export const Sidebar: FC = (): ReactElement => {
  const { data } = useSession();
  const userName = useMemo(() => data?.user?.name, [data]);
  const roleName = useMemo(() => data?.user?.role, [data]);
  const pathname = usePathname();

  const [open, setOpen] = useState("");

  const selectedMenu = (url: string) =>
    clsx(
      "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
      {
        "bg-gray-700": pathname === url,
      },
    );

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <div className="flex flex-col gap-y-4 mb-4">
          <span className="text-white font-medium  w-full block text-2xl">POS UMKM</span>
          <div className="bg-gray-600 p-2 rounded-lg flex flex-col">
            <span className="text-white text-base">{userName}</span>
            <span className="text-white text-sm">{roleName}</span>
          </div>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link href="/dashboard?title=Dashboard" className={selectedMenu("/dashboard")}>
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li className="text-white">
            <div
              onClick={() => (open === "" || open !== "report" ? setOpen("report") : setOpen(""))}
              className="flex gap-x-3 cursor-pointer select-none items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiFillBook className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white" />
              Catatan Laporan
              <AiFillCaretDown
                className={clsx(
                  "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white",
                  {
                    "rotate-180": open === "report",
                  },
                )}
              />
            </div>
            <div className="my-3" />
            {open === "report" && (
              <div className="flex flex-col gap-y-2 p-2 ml-2 bg-gray-600 rounded-lg">
                <Link
                  href="/dashboard/report/transaction?title=Data Pelaporan Transaksi"
                  className={selectedMenu("/dashboard/report/transaction")}
                >
                  <AiFillBook className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Transaksi</span>
                </Link>
                <Link
                  href="/dashboard/report/payment?title=Data Pelaporan Pembayaran"
                  className={selectedMenu("/dashboard/report/payment")}
                >
                  <AiFillMoneyCollect className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Pembayaran</span>
                </Link>
                <Link
                  href="/dashboard/report?title=Data Pelaporan"
                  className={selectedMenu("/dashboard/report/financial")}
                >
                  <IoMdBasket className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Laporan Kuangan</span>
                </Link>
              </div>
            )}
          </li>
          <li className="text-white">
            <div
              onClick={() =>
                open === "" || open !== "customer" ? setOpen("customer") : setOpen("")
              }
              className="flex gap-x-3 cursor-pointer select-none justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HiUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white" />
              Catatan Pelanggan
              <AiFillCaretDown
                className={clsx(
                  "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white",
                  {
                    "rotate-180": open === "customer",
                  },
                )}
              />
            </div>
            <div className="my-3" />
            {open === "customer" && (
              <div className="flex flex-col gap-y-2 p-2 ml-2 bg-gray-600 rounded-lg">
                <Link
                  href="/dashboard/report/debt?title=Data Hutang"
                  className={selectedMenu("/dashboard/customer/debt")}
                >
                  <AiFillBook className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Hutang</span>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};
