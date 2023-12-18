import { DashboardReportTransactionCreateModule } from "@/modules";
import { NextPage } from "next";
import { ReactElement } from "react";

const DashboardTransactionCreatePage: NextPage = (): ReactElement => {
  return <DashboardReportTransactionCreateModule />;
};

export default DashboardTransactionCreatePage;
