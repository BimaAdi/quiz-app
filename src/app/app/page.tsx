import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import { getUserFromLuciaSession } from "@/server/utils/getUser";
import { appRouter } from "@/server/router";
import AllQuiz from "@/client/components/app/AllQuiz";

export const dynamic = "force-dynamic";

export default async function AppPage() {
  const authRequest = auth.handleRequest("GET", context);
  const luciaSession = await authRequest.validate();
  const { user } = await getUserFromLuciaSession(luciaSession);
  const allCreatedQuiz = await appRouter
    .createCaller({ user: user, session: null })
    .quiz.getAllQuizUser();

  const allSolveQuiz = await appRouter.createCaller({user: user, session: null}).solveQuiz.getListSolveQuiz();

  return (
    <div className="max-w-[1300px] mx-auto">
      <AllQuiz allCreatedQuiz={allCreatedQuiz} allSolveQuiz={allSolveQuiz} />
    </div>
  );
}
