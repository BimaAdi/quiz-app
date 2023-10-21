import * as context from "next/headers";
import { auth } from "@/server/auth/lucia";
import { getUserFromLuciaSession } from "@/server/utils/getUser";
import { appRouter } from "@/server/router";
import QuizEditorListEdit from "@/client/components/quiz/QuizEditorListEdit";

export const dynamic = "force-dynamic";

export const revalidate = 0;

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
    return (
      <div className="max-w-[1300px] mx-auto flex flex-col gap-4">
        <div className="w-full h-[750px] grid place-items-center">
          <h1 className="text-4xl">Quiz not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto flex flex-col gap-4">
      <QuizEditorListEdit
        id={quiz.id}
        name={quiz.name}
        listQuiz={quiz.QuizQuestion.map((question) => ({
          quiz_id: question.id,
          no: question.number.toString(),
          question: question.question,
          choice: question.QuizQuestionChoice.map((choice) => ({
            choice_id: choice.id,
            tag: choice.choice,
            choice: choice.answer,
            isCorrectAnswer: choice.answer === question.correct_answer,
          })),
        }))}
      />
    </div>
  );
}
