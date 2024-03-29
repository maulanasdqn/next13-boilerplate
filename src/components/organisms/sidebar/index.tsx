"use client";
import { FC, Fragment, ReactElement, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { IoMdDesktop, IoMdLogOut, IoMdSettings } from "react-icons/io";
import {
  AiFillAccountBook,
  AiFillBook,
  AiFillBoxPlot,
  AiFillCaretDown,
  AiFillMoneyCollect,
  AiFillRead,
  AiFillTag,
} from "react-icons/ai";
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import Link from "next/link";
import { useQueryState } from "next-usequerystate";
import { TUser } from "@/entities/user";
import { PERMISSIONS } from "@/server/database/schema";
import { hasCommonElements } from "@/utils";
import { SiMarketo } from "react-icons/si";
import { FaBox, FaUsersCog } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaShield } from "react-icons/fa6";

export const Sidebar: FC<{ user: TUser }> = ({ user }): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useQueryState("isSidebarOpen");
  const [open, setOpen] = useState("");
  const userName = useMemo(() => user?.fullname, [user]);
  const roleName = useMemo(() => user?.role?.name, [user]);
  const businessName = useMemo(() => user?.business?.name, [user]);
  const pathname = usePathname();

  const selectedMenu = (url: string) =>
    clsx(
      "flex items-center p-2 text-primary rounded-lg group hover:text-white hover:bg-primary hover:bg-opacity-70",
      {
        "bg-primary text-white": pathname === url,
      },
    );

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
      name: "Pesanan",
      icon: <AiFillAccountBook className={iconClassName("")} />,
      path: "order",
      permissions: [PERMISSIONS.ORDER_READ],
      children: [
        {
          name: "Data Pesanan",
          icon: <FaShoppingCart className={iconClassName("/dashboard/order")} />,
          path: "/dashboard/order",
          url: `/dashboard/order?title=Manajamen Pesanan&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.ORDER_READ],
        },
      ],
    },
    {
      name: "Laporan",
      icon: <AiFillBook className={iconClassName("")} />,
      path: "report",
      permissions: [
        PERMISSIONS.REPORT_TRANSACTION_READ,
        PERMISSIONS.REPORT_PAYMENT_READ,
        PERMISSIONS.REPORT_FINANCIAL_READ,
        PERMISSIONS.HAS_BUSINESS,
      ],
      children: [
        {
          name: "Transaksi",
          icon: <AiFillBoxPlot className={iconClassName("/dashboard/report/transaction")} />,
          path: "/dashboard/report/transaction",
          url: `/dashboard/report/transaction?title=Riwayat Data Transaksi&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.REPORT_TRANSACTION_READ],
        },
        {
          name: "Keuangan",
          icon: <AiFillMoneyCollect className={iconClassName("/dashboard/report/financial")} />,
          path: "/dashboard/report/financial",
          url: `/dashboard/report/financial?title=Riwayat Data Keuangan&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.REPORT_FINANCIAL_READ],
        },
        {
          name: "Pembayaran",
          icon: <AiFillBook className={iconClassName("/dashboard/report/payment")} />,
          path: "/dashboard/report/payment",
          url: `/dashboard/report/payment?title=Riwayat Data Pembayaran&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.REPORT_PAYMENT_READ],
        },
      ],
    },

    {
      name: "Pengguna",
      icon: <FaUsersCog className={iconClassName("")} />,
      path: "role",
      permissions: [PERMISSIONS.USER_READ],
      children: [
        {
          name: "Pengguna",
          icon: <PiUsersThreeFill className={iconClassName("/dashboard/user")} />,
          path: "/dashboard/user",
          url: `/dashboard/user?title=Data Pengguna&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.USER_READ],
        },
        {
          name: "Hak Akses",
          icon: <FaShield className={iconClassName("/dashboard/user/role")} />,
          path: "/dashboard/user/role",
          url: `/dashboard/user/role?title=Data Hak Akses&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.ROLE_READ],
        },
      ],
    },

    {
      name: "Produk",
      icon: <AiFillTag className={iconClassName("")} />,
      path: "product",
      permissions: [PERMISSIONS.PRODUCT_READ, PERMISSIONS.PRODUCT_CATEGORY_READ],
      children: [
        {
          name: "Produk",
          icon: <FaBox className={iconClassName("/dashboard/product")} />,
          path: "/dashboard/product",
          url: `/dashboard/product?title=Data Produk&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.PRODUCT_READ],
        },

        {
          name: "Kategori Produk",
          icon: <BiSolidCategory className={iconClassName("/dashboard/product/category")} />,
          path: "/dashboard/product/category",
          url: `/dashboard/product/category?title=Data Kategori Produk&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.PRODUCT_CATEGORY_READ],
        },
      ],
    },

    {
      name: "Pelanggan",
      icon: <AiFillRead className={iconClassName("")} />,
      path: "pelanggan",
      permissions: [PERMISSIONS.CUSTOMER_READ],
      children: [
        {
          name: "Pelanggan",
          icon: <FaUsers className={iconClassName("/dashboard/customer")} />,
          path: "/dashboard/customer",
          url: `/dashboard/customer?title=Riwayat Pelanggan&isSidebarOpen=${isSidebarOpen}`,
          permissions: [PERMISSIONS.CUSTOMER_READ],
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
            <span className="text-primary font-bold  w-full block text-2xl">iPOS</span>
          </div>
          <Link href={"/dashboard/setting?menu=account"}>
            <div className="bg-gray-100 p-2 rounded-lg flex flex-col cursor-pointer">
              <span className="text-gray-600 text-base">{userName}</span>

              <span className="text-gray-600 text-sm">
                {hasCommonElements(user?.role?.permissions, [PERMISSIONS.HAS_BUSINESS])
                  ? roleName + " - " + businessName
                  : roleName}
              </span>
            </div>
          </Link>
        </div>
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href={`/dashboard?title=Dashboard&isSidebarOpen=${isSidebarOpen}`}
              className={selectedMenu("/dashboard")}
            >
              <IoMdDesktop className={iconClassName("/dashboard")} />
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
                    className="flex gap-x-3 cursor-pointer group justify-between select-none items-center p-2 rounded-lg text-primary hover:bg-primary hover:text-white hover:bg-opacity-70"
                  >
                    <div className="flex gap-x-3 items-center group">
                      {item.icon}
                      {item.name}
                    </div>
                    <AiFillCaretDown
                      className={clsx(
                        "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-700",
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
            <Link
              href={`/dashboard/setting?title=Pengaturan&isSidebarOpen=${isSidebarOpen}&menu=account`}
              className={selectedMenu("/dashboard/setting")}
            >
              <IoMdSettings className={iconClassName("/dashboard/setting")} />
              <span className="ms-3">Pengaturan</span>
            </Link>
          </li>
          <li className="block md:hidden">
            <span onClick={() => setIsSidebarOpen("close")} className={selectedMenu("")}>
              <IoMdLogOut className={iconClassName("")} />
              <span className="ms-3">Tutup Sidebar</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
};
