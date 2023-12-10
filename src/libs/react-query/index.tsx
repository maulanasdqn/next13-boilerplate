"use client";
import { FC, PropsWithChildren, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appTrpc, clientTrpc } from "@/libs/trpc/client";

export const QueryProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const queryClient = new QueryClient();

  return (
    <clientTrpc.Provider client={appTrpc} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </clientTrpc.Provider>
  );
};
