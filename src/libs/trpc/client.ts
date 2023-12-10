"use client";
import { type AppRouter } from "@/server";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";

export const clientTrpc = createTRPCReact<AppRouter>({});

export const appTrpc = clientTrpc.createClient({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL as string,
    }),
  ],
});
