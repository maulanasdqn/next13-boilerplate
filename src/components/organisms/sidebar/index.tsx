import { FC, ReactElement, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { IoMdBasket, IoMdDesktop } from "react-icons/io";
import { AiFillBook, AiFillBoxPlot, AiFillCaretDown, AiFillMoneyCollect } from "react-icons/ai";
import { PiUsersThreeFill } from "react-icons/pi";
import { HiArchiveBox, HiUsers } from "react-icons/hi2";
import Link from "next/link";
import { useQueryState } from "next-usequerystate";

export const Sidebar: FC = (): ReactElement => {
  const { data } = useSession();
  const [isSidebarOpen] = useQueryState("isSidebarOpen");
  const [open, setOpen] = useState("");
  const userName = useMemo(() => data?.user?.fullname, [data]);
  const roleName = useMemo(() => data?.user?.role?.name, [data]);
  const pathname = usePathname();

  const selectedMenu = (url: string) =>
    clsx("flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group", {
      "bg-gray-700": pathname === url,
    });

  const sidebarClassName = clsx("fixed top-0 left-0 z-40 w-64 h-screen transition-transform", {
    "translate-x-0": isSidebarOpen === "open" || isSidebarOpen === "null" || !isSidebarOpen,
    "-translate-x-full": isSidebarOpen === "close",
  });

  return (
    <aside id="default-sidebar" className={sidebarClassName} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
        <div className="flex flex-col gap-y-4 mb-4">
          <span className="text-white font-medium  w-full block text-2xl">POS UMKM</span>
          <div className="bg-gray-600 p-2 rounded-lg flex flex-col">
            <span className="text-white text-base">{userName}</span>
            <span className="text-white text-sm">{roleName}</span>
          </div>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href={`/dashboard?title=Dashboard&isSidebarOpen=${isSidebarOpen}`}
              className={selectedMenu("/dashboard")}
            >
              <IoMdDesktop className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75  group-hover:text-white" />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li className="text-white">
            <div
              onClick={() => (open === "" || open !== "report" ? setOpen("report") : setOpen(""))}
              className="flex gap-x-3 cursor-pointer justify-between select-none items-center p-2 rounded-lg text-white hover:bg-gray-700"
            >
              <div className="flex gap-x-3 items-center">
                <AiFillBook className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white" />
                Man. Laporan
              </div>
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
                  href={`/dashboard/report/transaction?title=Data Transaksi&isSidebarOpen=${isSidebarOpen}`}
                  className={selectedMenu("/dashboard/report/transaction")}
                >
                  <AiFillBook className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Transaksi</span>
                </Link>
                <Link
                  href={`/dashboard/report/payment?title=Data Pembayaran&isSidebarOpen=${isSidebarOpen}`}
                  className={selectedMenu("/dashboard/report/payment")}
                >
                  <AiFillMoneyCollect className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Pembayaran</span>
                </Link>
                <Link
                  href={`/dashboard/report/financial?title=Data Keuangan&isSidebarOpen=${isSidebarOpen}`}
                  className={selectedMenu("/dashboard/report/financial")}
                >
                  <IoMdBasket className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Kuangan</span>
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
              <div className="flex gap-x-3 items-center">
                <HiUsers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white" />
                Man. Pelanggan
              </div>
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
                  href={`/dashboard/customer/debt?title=Data Hutang Pelanggan&isSidebarOpen=${isSidebarOpen}`}
                  className={selectedMenu("/dashboard/customer/debt")}
                >
                  <AiFillBook className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Hutang</span>
                </Link>
                <Link
                  href={`/dashboard/customer?title=Data Pelanggan&isSidebarOpen=${isSidebarOpen}`}
                  className={selectedMenu("/dashboard/customer")}
                >
                  <PiUsersThreeFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Pelanggan</span>
                </Link>
              </div>
            )}
          </li>
          <li className="text-white">
            <div
              onClick={() => (open === "" || open !== "item" ? setOpen("item") : setOpen(""))}
              className="flex gap-x-3 cursor-pointer select-none justify-between items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex gap-x-3 items-center">
                <HiArchiveBox className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white" />
                Man. Barang
              </div>
              <AiFillCaretDown
                className={clsx(
                  "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white",
                  {
                    "rotate-180": open === "item",
                  },
                )}
              />
            </div>
            <div className="my-3" />
            {open === "item" && (
              <div className="flex flex-col gap-y-2 p-2 ml-2 bg-gray-600 rounded-lg">
                <Link
                  href={`/dashboard/item?title=Data Barang&isSidebarOpen=${isSidebarOpen}`}
                  className={selectedMenu("/dashboard/item")}
                >
                  <AiFillBoxPlot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Data Barang</span>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};
