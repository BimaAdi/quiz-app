import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import { appRouter } from "@/server/router";
import { getUserFromLuciaSession } from "@/server/utils/getUser";
import Link from "next/link";
import Publish from "@/client/components/app/detail/Publish";

export default async function AppEditPage({
  params,
}: {
  params: { id: string };
}) {
  const authRequest = auth.handleRequest("GET", context);
  const luciaSession = await authRequest.validate();
  const { user } = await getUserFromLuciaSession(luciaSession);
  const quiz = await appRouter
    .createCaller({ user: user, session: null })
    .quiz.getDetailQuizForEdit(params.id);

  if (!quiz) {
    return <div>not found</div>;
  }

  return (
    <div>
      <Link className="py-5 cursor-pointer" href="/app">
        &lt;Back
      </Link>
      {/* action */}
      <div className="flex flex-col gap-2 justify-between p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {quiz.name}
        </h5>
        {quiz.QuizStatus.name === "finish" ? (
          <div className="bg-green-500 rounded p-2 text-center text-white font-bold">
            Finish
          </div>
        ) : (
          <></>
        )}
        {quiz.QuizStatus.name === "publish" ? (
          <div className="bg-blue-500 rounded p-2 text-center text-white font-bold">
            Publish
          </div>
        ) : (
          <></>
        )}
        {quiz.QuizStatus.name === "draft" ? (
          <div className="bg-gray-500 rounded p-2 text-center text-white font-bold">
            Draft
          </div>
        ) : (
          <></>
        )}
        <Publish />
      </div>
      {/* table */}
      {/* preview */}
    </div>
  );
}
