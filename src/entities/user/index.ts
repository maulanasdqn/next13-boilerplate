import { TToken } from "..";

export type TUser = {
  id: string;
  fullname: string;
  image?: string;
  email: string;
  isPasswordSet: boolean;
  business?: {
    id: string;
    name: string;
    image: string;
    ownerId: string;
    address: string;
    phoneNumber: string;
  };
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
} & TToken;
