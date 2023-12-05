import { TToken } from "..";

export type TUser = {
  id: string;
  fullname: string;
  image?: string;
  email: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
} & TToken;
