import { api, mock } from "@/libs";
import { TLoginResponse, TLoginRequest, TRefreshTokenRequest, TRefreshTokenResponse } from "./type";

export const loginRequest = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const { data } = await api.post<TLoginResponse>(`auth/login`, payload);
  return data;
};

export const loginRequestMock = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const { data } = await mock.post<TLoginResponse>(`auth/login`, payload);
  return data;
};

export const refreshRequest = async (
  payload: TRefreshTokenRequest,
): Promise<TRefreshTokenResponse> => {
  const { data } = await api.post<TRefreshTokenResponse>("/auth/refresh", payload);
  return data;
};
