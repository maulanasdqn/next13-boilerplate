import { DashboardHeadTemplate } from "@/components/templates/dashboard/head";
import { Navbar } from "@/components/organisms/navbar";
import { Sidebar } from "@/components/organisms/sidebar";
import { TUser } from "@/entities/user";
import { authOptions } from "@/libs/next-auth/option";
import { ModuleMixin } from "@/modules/mixin";
import { getServerSession } from "next-auth";
import { Fragment, PropsWithChildren } from "react";

export const DashboardMixin = async (props: PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  return (
    <Fragment>
      <Sidebar user={session?.user as TUser} />
      <Navbar user={session?.user as TUser} />
      <ModuleMixin>
        <DashboardHeadTemplate />
        {props.children}
      </ModuleMixin>
    </Fragment>
  );
};
