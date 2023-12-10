import { router } from "@/libs/trpc/init";
import * as routes from "./router";

export const appRouter = router(routes);

export type AppRouter = typeof appRouter;
