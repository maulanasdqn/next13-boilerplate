import { AuthLoginModule } from "@/modules";
import { NextPage } from "next";
import { ReactElement } from "react";

const Home: NextPage = (): ReactElement => {
  return <AuthLoginModule />;
};

export default Home;
