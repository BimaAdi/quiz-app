import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { protectedProcedure, router } from "@/server/utils/trpcRouter";
import { prisma } from "@/server/db/prisma";
import {
  getAllQuizUserService,
  getDetailUserService,
} from "@/server/service/quiz";

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
  getAllQuizUser: protectedProcedure.query(async ({ ctx }) => {
    const data = await getAllQuizUserService(ctx.user);
    return data;
  }),
  getDetailQuizForEdit: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const data = await getDetailUserService(input, ctx.user);
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
  editQuiz: protectedProcedure
    .input(
      z.object({
        id: z.string(),
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
      const quiz_id = input.id;
      const quiz = await prisma.quiz.findFirst({
        where: {
          id: input.id,
        },
      });
      if (!quiz) {
        return null;
      }

      await prisma.$transaction(async (tx) => {
        const updated_quiz = await tx.quiz.update({
          where: {
            id: quiz_id,
          },
          data: {
            name: input.quizName,
            // updated_at: Date.now().toString(),
          },
        });

        await tx.quizQuestion.deleteMany({
          where: {
            quiz_id: quiz_id,
          },
        });

        for (let i = 0; i < input.question.length; i++) {
          await tx.quizQuestion.create({
            data: {
              id: uuidv4(),
              quiz_id: updated_quiz.id,
              number: i + 1,
              question: input.question[i].question,
              correct_answer: input.question[i].correct_answer,
              QuizQuestionChoice: {
                createMany: {
                  data: input.question[i].choice.map(
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
        }
      });

      return quiz_id;
    }),
});
