import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const configApi: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
};

const configMock: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_MOCK_URL,
};

export const api = axios.create(configApi);
export const mock = axios.create(configMock);
