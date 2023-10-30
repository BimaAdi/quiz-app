import * as context from "next/headers";
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
  const doQuiz = await appRouter
    .createCaller({ user: user, session: null })
    .doQuiz.getQuizInfo({ quiz_id: params.id });

  const question = await appRouter
    .createCaller({ user: user, session: null })
    .doQuiz.getQuestion({
      quiz_id: params.id,
      number: parseInt(params.no),
    });

  if (!doQuiz || !question) {
    return <div>not found</div>;
  }

  return (
    <div className="max-w-[1300px] mx-auto">
      <DoItemQuiz
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
