import { publicProcedure, router } from "../utils/trpcRouter";
import { authRouter } from "./auth";
import { doQuizRouter } from "./doQuiz";
import { quizRouter } from "./quiz";
import { solveQuizRouter } from "./solveQuiz";

export const appRouter = router({
  auth: authRouter,
  quiz: quizRouter,
  doQuiz: doQuizRouter,
  solveQuiz: solveQuizRouter,
  hello: publicProcedure.query(() => {
    return "Welcome";
  }),
});
export type AppRouter = typeof appRouter;
