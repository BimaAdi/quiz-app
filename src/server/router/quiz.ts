import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { protectedProcedure, router } from "@/server/utils/trpcRouter";
import { prisma } from "@/server/db/prisma";

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

export const quizRouter = router({
  getAllQuiz: protectedProcedure.query(async ({ ctx }) => {
    const data = await prisma.quiz.findMany({
      where: {
        user_id: ctx.user.id,
      },
      orderBy: [
        {
          updated_at: "desc",
        },
      ],
    });

    return data;
  }),
  createQuiz: protectedProcedure
    .input(
      z.object({
        quizName: z.string().nonempty("quizName is required").min(5).max(200),
        question: z
          .array(
            z.object({
              question: z
                .string()
                .nonempty("question cannot be empty")
                .min(1)
                .max(500),
              correct_answer: z.string().nonempty().min(1).max(200),
              choice: z.array(z.string().nonempty().min(1).max(200)).length(4),
            })
          )
          .min(1)
          .max(50),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const quiz_id = uuidv4();
      const createdQuiz = await prisma.quiz.create({
        data: {
          id: quiz_id,
          name: input.quizName,
          user_id: ctx.user.id,
        },
      });

      input.question.map(async (questionElement, questionIndex) => {
        await prisma.quizQuestion.create({
          data: {
            id: uuidv4(),
            quiz_id: createdQuiz.id,
            number: questionIndex + 1,
            question: questionElement.question,
            correct_answer: questionElement.correct_answer,
            QuizQuestionChoice: {
              createMany: {
                data: questionElement.choice.map(
                  (choiceElement, choiceIndex) => {
                    return {
                      id: uuidv4(),
                      choice: generateChoice(choiceIndex),
                      answer: choiceElement,
                    };
                  }
                ),
              },
            },
          },
        });
      });

      return createdQuiz.id;
    }),
});
