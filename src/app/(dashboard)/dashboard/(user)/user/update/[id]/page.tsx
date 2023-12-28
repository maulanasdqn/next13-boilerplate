import { DashboardUserCreateModule } from "@/modules";
import { DashboardUserUpdateModule } from "@/modules/dashboard/user/update";
import { NextPage } from "next";

const DashboardUserUpdatePage: NextPage = async () => {
  return <DashboardUserUpdateModule />;
};

export default DashboardUserUpdatePage;
