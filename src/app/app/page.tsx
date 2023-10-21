import * as context from "next/headers";
import QuizCard from "@/client/components/app/QuizCard";
import SubNavbar from "@/client/components/app/SubNavbar";
import { auth } from "@/server/auth/lucia";
import { getUserFromLuciaSession } from "@/server/utils/getUser";
import { appRouter } from "@/server/router";

export default async function AppPage() {
  const authRequest = auth.handleRequest("GET", context);
  const luciaSession = await authRequest.validate();
  const { user } = await getUserFromLuciaSession(luciaSession);
  const allQuiz = await appRouter
    .createCaller({ user: user, session: null })
    .quiz.getAllQuizUser();

  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="mb-2">
        <SubNavbar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {allQuiz.map((quiz) => (
          <QuizCard key={quiz.id} id={quiz.id} type="draft" title={quiz.name} />
        ))}
        <QuizCard type="add" />
      </div>
    </div>
  );
}
