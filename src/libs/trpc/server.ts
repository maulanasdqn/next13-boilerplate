"use server";
import { appRouter } from "@/server";

export const serverTrpc = appRouter.createCaller({
  session: null,
});
