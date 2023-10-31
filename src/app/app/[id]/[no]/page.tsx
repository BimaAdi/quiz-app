import * as context from "next/headers";
import { redirect } from "next/navigation";
import { TRPCError } from "@trpc/server";
import { auth } from "@/server/auth/lucia";
import { appRouter } from "@/server/router";
import { getUserFromLuciaSession } from "@/server/utils/getUser";
import DoItemQuiz from "@/client/components/app/detail/DoItemQuiz";

const generateChoice = (idx: number): string => {
  if (idx === 0) {
    return "A";
  } else if (idx === 1) {
    return "B";
  } else if (idx === 2) {
    return "C";
  } else {
    return "D";
  }
};

export default async function AppDoQuizPage({
  params,
}: {
  params: { id: string; no: string };
}) {
  const authRequest = auth.handleRequest("GET", context);
  const luciaSession = await authRequest.validate();
  const { user } = await getUserFromLuciaSession(luciaSession);
  let doQuiz = null;
  try {
    doQuiz = await appRouter
      .createCaller({ user: user, session: null })
      .doQuiz.getQuizInfo({ quiz_id: params.id });
  } catch (e) {
    if (e instanceof TRPCError) {
      if (e.code === "FORBIDDEN" || e.code === "BAD_REQUEST") {
        return redirect(`/app/${params.id}`);
      }
    }
    return <div>Something wrong with server</div>;
  }

  let question = null;
  try {
    question = await appRouter
      .createCaller({ user: user, session: null })
      .doQuiz.getQuestion({
        quiz_id: params.id,
        number: parseInt(params.no),
      });
  } catch {
    question = null;
  }

  if (!doQuiz || !question) {
    return redirect(`/app/${params.id}`);
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      <DoItemQuiz
        quiz_id={params.id}
        question_id={question.question_id}
        no={question.number}
        numQuestion={doQuiz.num_question}
        question={question.question}
        choices={question.choices.map((choice, index) => {
          return {
            id: choice.id,
            tag: generateChoice(index),
            answer: choice.answer,
          };
        })}
        yourAnswer={question.your_answer}
      />
    </div>
  );
}
