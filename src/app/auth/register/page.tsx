import { AuthRegisterModule } from "@/modules";
import { NextPage } from "next";
import { ReactElement } from "react";

const AuthRegisterPage: NextPage = (): ReactElement => {
  return <AuthRegisterModule />;
};

export default AuthRegisterPage;
