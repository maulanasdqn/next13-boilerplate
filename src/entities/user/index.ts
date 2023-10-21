import { TToken } from "..";

export type TUser = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
} & TToken;
