import { Prisma, PrismaClient, User } from "@prisma/client";
import { prisma } from "../db/prisma";
import { DefaultArgs } from "@prisma/client/runtime/library";

export const getAllQuizUserService = async (user: User | undefined | null) => {
  if (!user) {
    return [];
  }

  const data = await prisma.quiz.findMany({
    include: {
      QuizStatus: true,
    },
    where: {
      user_id: user.id,
    },
    orderBy: [
      {
        updated_at: "desc",
      },
    ],
  });
  return data;
};

export const getDetailQuizUserService = async (id: string, user: User) => {
  const data = await prisma.quiz.findFirst({
    include: {
      QuizQuestion: {
        include: {
          QuizQuestionChoice: true,
        },
      },
      QuizStatus: true,
    },
    where: {
      id: id,
      user_id: user.id,
    },
  });

  return data;
};

export const calculateScoreAll = async (
  tx: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
  quizId: string
) => {
  const alldoQuiz = await tx.doQuiz.findMany({
    include: {
      DoQuizAnswer: {
        include: {
          quiz_question: true,
        },
      },
    },
    where: {
      quiz_id: quizId,
    },
  });

  alldoQuiz.forEach(async (doQuiz) => {
    if (doQuiz.finish_at === null) {
      const numCorrectAnswer = doQuiz.DoQuizAnswer.reduce((acc, item) => {
        if (item.answer === item.quiz_question.correct_answer) {
          return acc + 1;
        }
        return acc;
      }, 0);

      await tx.doQuiz.update({
        where: {
          id: doQuiz.id,
        },
        data: {
          num_correct_answer: numCorrectAnswer,
        },
      });
    }
  });
};
