"use client";
import { FC, Fragment, ReactElement, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { IoMdBasket, IoMdDesktop, IoMdLogOut } from "react-icons/io";
import {
  AiFillBook,
  AiFillBoxPlot,
  AiFillCaretDown,
  AiFillMoneyCollect,
  AiFillSetting,
  AiFillTag,
} from "react-icons/ai";
import { PiUsersThreeFill } from "react-icons/pi";
import { HiArchiveBox, HiUsers } from "react-icons/hi2";
import Link from "next/link";
import { useQueryState } from "next-usequerystate";
import { BiSolidUser } from "react-icons/bi";
import { TUser } from "@/entities/user";
import { PERMISSIONS } from "@/server/database/schema";
import { hasCommonElements } from "@/utils";
import { SiMarketo } from "react-icons/si";

export const Sidebar: FC<{ user: TUser }> = ({ user }): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useQueryState("isSidebarOpen");
  const [open, setOpen] = useState("");
  const userName = useMemo(() => user?.fullname, [user]);
  const roleName = useMemo(() => user?.role?.name, [user]);
  const pathname = usePathname();

  const selectedMenu = (url: string) =>
    clsx("flex items-center p-2 text-primary rounded-lg group hover:text-white hover:bg-primary", {
      "bg-primary text-white": pathname === url,
    });

  const sidebarClassName = clsx("fixed top-0 left-0 z-40 w-64 h-screen transition-transform", {
    "translate-x-0": isSidebarOpen === "open" || isSidebarOpen === "null" || !isSidebarOpen,
    "-translate-x-full": isSidebarOpen === "close",
  });

  const iconClassName = (url: string) =>
    clsx(
      "flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-white group-hover:text-white hover:text-white",
      {
        "text-primary ": pathname !== url,

        "text-white": pathname === url,
      },
    );

  const sidebarData = [
    {
      name: "Man. Laporan",
      icon: <AiFillBook className={iconClassName} />,
      path: "report",
      permissions: [
        PERMISSIONS.REPORT_TRANSACTION_READ,
        PERMISSIONS.REPORT_PAYMENT_READ,
        PERMISSIONS.REPORT_FINANCIAL_READ,
      ],
      children: [
        {
          name: "Data Transaksi",
          icon: <AiFillBoxPlot className={iconClassName} />,
          path: "/dashboard/report/transaction",
          url: `/dashboard/report/transaction?title=Data Transaksi&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.REPORT_TRANSACTION_READ],
        },
        {
          name: "Data Keuangan",
          icon: <AiFillMoneyCollect className={iconClassName} />,
          path: "/dashboard/report/financial",
          url: `/dashboard/report/financial?title=Data Keuangan&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.REPORT_FINANCIAL_READ],
        },
        {
          name: "Data Pembayaran",
          icon: <AiFillBook className={iconClassName} />,
          path: "/dashboard/report/payment",
          url: `/dashboard/report/payment?title=Data Pembayaran&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.REPORT_PAYMENT_READ],
        },
      ],
    },

    {
      name: "Man. User",
      icon: <AiFillSetting className={iconClassName} />,
      path: "role",
      permissions: [PERMISSIONS.ROLE_READ, PERMISSIONS.USER_READ],
      children: [
        {
          name: "Data Role",
          icon: <AiFillSetting className={iconClassName} />,
          path: "/dashboard/user/role",
          url: `/dashboard/user/role?title=Data Role&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.ROLE_READ],
        },

        {
          name: "Data Pengguna",
          icon: <PiUsersThreeFill className={iconClassName} />,
          path: "/dashboard/user/user",
          url: `/dashboard/user/user?title=Data Pengguna&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.ROLE_READ],
        },
      ],
    },

    {
      name: "Man. Product",
      icon: <AiFillTag className={iconClassName} />,
      path: "product",
      permissions: [PERMISSIONS.PRODUCT_READ],
      children: [
        {
          name: "Data Product",
          icon: <AiFillSetting className={iconClassName} />,
          path: "/dashboard/product",
          url: `/dashboard/product?title=Data Produk&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.PRODUCT_READ],
        },
      ],
    },
  ];

  return (
    <aside id="default-sidebar" className={sidebarClassName} aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-md">
        <div className="flex flex-col gap-y-4 mb-4">
          <div className="flex gap-x-3 items-center">
            <SiMarketo className="text-primary" size={24} />
            <span className="text-primary font-bold  w-full block text-2xl">POS UMKM</span>
          </div>
          <Link href={"/dashboard/profile?title=Profile"}>
            <div className="bg-gray-100 p-2 rounded-lg flex flex-col cursor-pointer">
              <span className="text-gray-600 text-base">{userName}</span>
              <span className="text-gray-600 text-sm">{roleName}</span>
            </div>
          </Link>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href={`/dashboard?title=Dashboard&isSidebarOpen=${isSidebarOpen}`}
              className={selectedMenu("/dashboard")}
            >
              <IoMdDesktop className={iconClassName} />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          {sidebarData.map((item, index) => (
            <Fragment key={index}>
              {hasCommonElements(item.permissions, user?.role?.permissions) && (
                <li key={index} className="text-white">
                  <div
                    onClick={() =>
                      open === "" || open !== item.path ? setOpen(item.path) : setOpen("")
                    }
                    className="flex gap-x-3 cursor-pointer group justify-between select-none items-center p-2 rounded-lg text-primary hover:bg-primary hover:text-white"
                  >
                    <div className="flex gap-x-3 items-center group">
                      {item.icon}
                      {item.name}
                    </div>
                    <AiFillCaretDown
                      className={clsx(
                        "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white",
                        {
                          "rotate-180": open === item.path,
                        },
                      )}
                    />
                  </div>
                  <div className="my-3" />
                  {open === item.path && (
                    <div className="flex flex-col gap-y-2 p-2 bg-gray-100 ml-2 text-primary rounded-lg">
                      {item.children?.map((child, index) => (
                        <Fragment key={index}>
                          {hasCommonElements(child.permissions, user?.role?.permissions) && (
                            <Link key={index} href={child.url} className={selectedMenu(child.path)}>
                              {child.icon}
                              <span className="flex-1 ms-3 whitespace-nowrap">{child.name}</span>
                            </Link>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  )}
                </li>
              )}
            </Fragment>
          ))}
          <li>
            <span onClick={() => setIsSidebarOpen("close")} className={selectedMenu("")}>
              <IoMdLogOut className={iconClassName} />
              <span className="ms-3">Tutup Sidebar</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
};
