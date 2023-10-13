import { publicProcedure, router } from "../utils/trpcRouter";
import { authRouter } from "./auth";

export const appRouter = router({
    auth: authRouter,
    hello: publicProcedure.query(() => { return "Welcome" })
})
export type AppRouter = typeof appRouter;
