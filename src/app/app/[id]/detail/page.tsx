import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import { appRouter } from "@/server/router";
import { getUserFromLuciaSession } from "@/server/utils/getUser";

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

  return (
    <div>
      <div>App Detail {params.id}</div>
      <div>{JSON.stringify(quiz)}</div>
    </div>
  );
}
