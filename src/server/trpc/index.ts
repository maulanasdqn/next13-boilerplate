import { router } from "@/libs/trpc/init";
import { authRouter, reportRouter } from "./router";

export const appRouter = router({
  ...reportRouter,
  ...authRouter,
});

export type AppRouter = typeof appRouter;
