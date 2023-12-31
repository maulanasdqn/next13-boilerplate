import { TUser } from "@/entities/user";
import { authOptions } from "@/libs/next-auth/option";
import { SettingModule } from "@/modules/dashboard/setting";
import { getServerSession } from "next-auth";
import { ReactElement } from "react";

const SettingPage = async (): Promise<ReactElement> => {
  const session = await getServerSession(authOptions);
  return <SettingModule session={session?.user as TUser} />;
};

export default SettingPage;
