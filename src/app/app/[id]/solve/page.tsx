import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import { appRouter } from "@/server/router";
import { getUserFromLuciaSession } from "@/server/utils/getUser";
import StartQuiz from "@/client/components/app/detail/StartQuiz";
import SolveQuiz from "@/client/components/app/detail/SolveQuiz";

export default async function AppQuizSolvePage({
  params,
}: {
  params: { id: string };
}) {
  const authRequest = auth.handleRequest("GET", context);
  const luciaSession = await authRequest.validate();
  const { user } = await getUserFromLuciaSession(luciaSession);

  const solveQuiz = await appRouter
    .createCaller({ user: user, session: null })
    .solveQuiz.getDetailSolveQuiz(params.id);

  if (!solveQuiz) {
    return <div>not found</div>;
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex flex-col items-center gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h1 className="text-2xl">{solveQuiz.quiz.name}</h1>
        <SolveQuiz
          id={solveQuiz.quiz.id}
          status={solveQuiz.finish_at === null ? "continue" : "finish"}
        />
      </div>
    </div>
  );
}
