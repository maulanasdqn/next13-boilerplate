import { AuthLoginModule } from "@/modules";
import { NextPage } from "next";
import { ReactElement } from "react";

const AuthLoginPage: NextPage = (): ReactElement => {
  return <AuthLoginModule />;
};

export default AuthLoginPage;
