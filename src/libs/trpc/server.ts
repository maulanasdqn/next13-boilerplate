"use server";
import { appRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";

export const serverTrpc = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL as string,
    }),
  ],
});
