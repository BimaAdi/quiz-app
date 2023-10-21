import { publicProcedure, router } from "../utils/trpcRouter";
import { authRouter } from "./auth";
import { quizRouter } from "./quiz";

export const appRouter = router({
    auth: authRouter,
    quiz: quizRouter,
    hello: publicProcedure.query(() => { return "Welcome" })
})
export type AppRouter = typeof appRouter;
