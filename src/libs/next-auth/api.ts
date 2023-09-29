import { api } from "@/libs";
import { TLoginResponse, TLoginRequest, TRefreshTokenRequest, TRefreshTokenResponse } from "./type";

export const loginRequest = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const { data } = await api.post<TLoginResponse>(`auth/login`, payload, {
    headers: {
      "Content-Type": "application/json",
      "app-origin": process.env.NEXT_PUBLIC_APP_ORIGIN,
    },
  });
  return data;
};

export const refreshRequest = async (
  payload: TRefreshTokenRequest,
): Promise<TRefreshTokenResponse> => {
  const { data } = await api.post<TRefreshTokenResponse>("/auth/refresh", payload);
  return data;
};
