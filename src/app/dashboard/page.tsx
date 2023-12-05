import { serverTrpc } from "@/libs";
import { DashboardModule } from "@/modules";
import { NextPage } from "next";

const DashboardPage: NextPage = async () => {
  const data = await serverTrpc.getReportTransaction();
  console.log(data);
  return <DashboardModule />;
};

export default DashboardPage;
