"use server";
import { TRegister } from "@/entities";
import { serverTrpc } from "@/libs";

export const RegisterAction = async (props: TRegister) => {
  return await serverTrpc.createUser(props);
};
