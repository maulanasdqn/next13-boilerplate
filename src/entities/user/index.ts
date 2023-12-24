import { TToken } from "..";

export type TUser = {
  id: string;
  fullname: string;
  image?: string;
  email: string;
  business?: {
    id: string;
    name: string;
    owner_id: string;
  };
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
} & TToken;
