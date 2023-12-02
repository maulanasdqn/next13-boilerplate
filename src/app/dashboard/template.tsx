"use client";
import { DashboardHeadTemplate, Navbar, Sidebar } from "@/components";
import { clsx } from "clsx";
import { NextPage } from "next";
import { useQueryState } from "next-usequerystate";
import { PropsWithChildren, ReactElement } from "react";

const DashboardTemplate: NextPage = (props: PropsWithChildren): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useQueryState("isSidebarOpen");

  const className = clsx(
    "pr-6 py-12 pl-10 mt-6  w-full bg-gray-50 gap-y-10 flex flex-col overflow-x-auto",
    {
      "sm:ml-60": isSidebarOpen === "open",
      "pl-6": isSidebarOpen === "close",
    },
  );
  return (
    <section className="flex bg-gray-50 w-full h-full min-h-screen overflow-x-auto">
      <Sidebar />
      <Navbar />
      <div className={className}>
        <DashboardHeadTemplate />
        <div className="w-full overflow-x-auto">{props.children}</div>
      </div>
    </section>
  );
};

export default DashboardTemplate;
