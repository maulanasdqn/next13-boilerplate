"use client";
import { DashboardHeadTemplate, Sidebar } from "@/components";
import { NextPage } from "next";
import { PropsWithChildren, ReactElement } from "react";

const DashboardTemplate: NextPage = (props: PropsWithChildren): ReactElement => {
  return (
    <section className="flex bg-gray-50 w-full h-full overflow-x-auto">
      <Sidebar />
      <div className="pr-6 py-12 pl-10 sm:ml-60 w-full bg-gray-50 gap-y-10 flex flex-col overflow-x-auto">
        <DashboardHeadTemplate />
        <div className="w-full overflow-x-auto">{props.children}</div>
      </div>
    </section>
  );
};

export default DashboardTemplate;
