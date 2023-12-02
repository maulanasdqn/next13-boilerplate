import { TToken } from "..";

export type TUser = {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: string;
} & TToken;
