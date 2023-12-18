import { FormSkeleton } from "@/modules";
import { NextPage } from "next";
import { ReactElement } from "react";

const LoadingAuthPage: NextPage = (): ReactElement => {
  return <FormSkeleton />;
};

export default LoadingAuthPage;
