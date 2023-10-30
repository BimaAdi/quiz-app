import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import { appRouter } from "@/server/router";
import { getUserFromLuciaSession } from "@/server/utils/getUser";
import StartQuiz from "@/client/components/app/detail/StartQuiz";

export default async function AppQuizPage({
  params,
}: {
  params: { id: string };
}) {
  const authRequest = auth.handleRequest("GET", context);
  const luciaSession = await authRequest.validate();
  const { user } = await getUserFromLuciaSession(luciaSession);
  const doQuiz = await appRouter
    .createCaller({ user: user, session: null })
    .doQuiz.getDetailQuizForQuiz(params.id);

  const getStatus = (
    x: typeof doQuiz.userQuizStatus
  ): "start" | "continue" | "finish" => {
    if (!x) {
      return "start";
    }

    if (x.finish_at === null) {
      return "continue";
    }

    return "finish";
  };

  if (!doQuiz) {
    return <div>not found</div>;
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="flex flex-col items-center gap-2 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h1 className="text-2xl">{doQuiz.quiz.name}</h1>
        <StartQuiz id={doQuiz.quiz.id} status={getStatus(doQuiz.userQuizStatus)} />
      </div>
    </div>
  );
}
