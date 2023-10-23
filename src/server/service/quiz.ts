import { User } from "@prisma/client";
import { prisma } from "../db/prisma";

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
