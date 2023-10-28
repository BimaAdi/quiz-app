import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import DayJSUtc from "dayjs/plugin/utc";
import DayJsTimezone from "dayjs/plugin/timezone";
import { protectedProcedure, router } from "@/server/utils/trpcRouter";
import { prisma } from "@/server/db/prisma";
import {
  getAllQuizUserService,
  getDetailQuizUserService,
} from "@/server/service/quiz";
import { TRPCError } from "@trpc/server";

dayjs.extend(DayJSUtc);
dayjs.extend(DayJsTimezone);

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
      const data = await getDetailQuizUserService(input, ctx.user);
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
          quiz_status_id: "64703e2a-1198-4f27-a9df-ff84255f8ef5", // Draft
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
          user_id: ctx.user.id,
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
            updated_at: dayjs().tz("Asia/Jakarta").toISOString(),
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
  deleteQuiz: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      try {
        const quiz = await prisma.quiz.findFirst({
          where: {
            id: input,
            user_id: ctx.user.id
          },
          include: {
            QuizStatus: true
          }
        })
    
        if (!quiz) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "quiz not found"
          })
        }
    
        if (quiz.QuizStatus.name === "publish") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "quiz in publish state please finish quiz first before deleting"
          })
        }


        await prisma.quiz.delete({
          where: {
            id: input,
            user_id: ctx.user.id,
          },
        });
      } catch { }
    }),
  publishQuiz: protectedProcedure.input(z.object({
    id: z.string(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  })).mutation(async ({ ctx, input }) => {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: input.id,
        user_id: ctx.user.id
      },
      include: {
        QuizStatus: true
      }
    })

    if (!quiz) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "quiz not found"
      })
    }

    if (quiz.QuizStatus.name !== "draft") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "quiz already been publish"
      })
    }

    await prisma.quiz.update({
      where: {
        id: quiz.id
      },
      data: {
        quiz_status_id: "005d2730-e3c8-4ea6-8e0f-c46b3bec2a4e",
        publish_start_at: input.startDate && null,
        publish_end_at: input.endDate && null,
      }
    })

    return quiz.id
  }),
  finishQuiz: protectedProcedure.input(z.string()).mutation(async ({ctx, input}) => {
    const quiz = await prisma.quiz.findFirst({
      where: {
        id: input,
        user_id: ctx.user.id
      },
      include: {
        QuizStatus: true
      }
    })

    if (!quiz) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "quiz not found"
      })
    }

    if (quiz.QuizStatus.name === "finish") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "quiz already been finish"
      })
    }

    if (quiz.QuizStatus.name === "draft") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "quiz hasn't been publish"
      })
    }

    await prisma.quiz.update({
      where: {
        id: quiz.id
      },
      data: {
        quiz_status_id: "39391176-4446-45a7-bd33-5a494290f642",
      }
    })

    return quiz.id
  })
});
