import { LandingModule } from "@/modules/landing/module";
import type { NextPage } from "next";
import { ReactElement } from "react";

const LandingPage: NextPage = (): ReactElement => {
  return <LandingModule />;
};

export default LandingPage;
