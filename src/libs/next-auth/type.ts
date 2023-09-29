import { TToken, TUser } from "@/entities";

export type TLoginResponse = {
  token: TToken;
} & TUser;

export type TLoginRequest = {
  email?: string;
  password?: string;
};

export type TRefreshTokenRequest = {
  refresh_token: string;
};

export type TRefreshTokenResponse = {
  access_token: string;
  exp: number;
};
