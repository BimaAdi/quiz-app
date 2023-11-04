import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const calculateScore = async (
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
  doQuizId: string
) => {
  const doQuiz = await tx.doQuiz.findFirst({
    include: {
      DoQuizAnswer: {
        include: {
          quiz_question: true,
        },
      },
    },
    where: {
      id: doQuizId,
    },
  });
  if (!doQuiz) {
    return;
  }

  const numCorrectAnswer = doQuiz.DoQuizAnswer.reduce((acc, item) => {
    if (item.answer === item.quiz_question.correct_answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  await tx.doQuiz.update({
    where: {
      id: doQuizId,
    },
    data: {
      num_correct_answer: numCorrectAnswer,
    },
  });
};
