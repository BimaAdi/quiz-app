import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../db/prisma";
import { protectedProcedure, router } from "../utils/trpcRouter";
import dayjs from "../utils/dayjs";

export const doQuizRouter = router({
  getDetailQuizForQuiz: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const quiz = await prisma.quiz.findFirst({
        where: {
          id: input,
          quiz_status_id: "005d2730-e3c8-4ea6-8e0f-c46b3bec2a4e", // Publish
        },
      });
      if (!quiz) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "quiz not found",
        });
      }

      const userQuizStatus = await prisma.doQuiz.findFirst({
        where: {
          user_id: ctx.user.id,
          quiz_id: input,
        },
      });
      return {
        quiz,
        userQuizStatus,
      };
    }),
  startQuiz: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const existingQuiz = await prisma.quiz.findFirst({
        where: {
          id: input,
        },
      });

      if (!existingQuiz) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "quiz not found",
        });
      }

      const data = await prisma.doQuiz.findFirst({
        where: {
          user_id: ctx.user.id,
          quiz_id: input,
        },
      });
      if (data) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you already start this quiz",
        });
      }

      await prisma.doQuiz.create({
        data: {
          id: uuidv4(),
          quiz_id: input,
          user_id: ctx.user.id,
          start_at: dayjs().tz("Asia/Jakarta").toISOString(),
        },
      });

      return null;
    }),
  finishQuiz: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const data = await prisma.doQuiz.findFirst({
        where: {
          user_id: ctx.user.id,
          quiz_id: input,
        },
      });
      if (!data) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you haven't start this quiz",
        });
      }

      if (!data.finish_at) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you already finished this quiz",
        });
      }

      await prisma.doQuiz.update({
        where: {
          id: data.id,
        },
        data: {
          finish_at: dayjs().tz("Asia/Jakarta").toISOString(),
        },
      });

      return null;
    }),
  getQuizInfo: protectedProcedure
    .input(
      z.object({
        quiz_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const quiz = await prisma.quiz.findFirst({
        include: {
          QuizQuestion: true,
        },
        where: {
          id: input.quiz_id,
        },
      });

      if (!quiz) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "quiz not found",
        });
      }
      const quizUser = await prisma.doQuiz.findFirst({
        where: {
          user_id: ctx.user.id,
          quiz_id: input.quiz_id,
        },
      });
      if (!quizUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you haven't start this quiz yet",
        });
      }

      return {
        id: quiz.id,
        name: quiz.name,
        num_question: quiz.QuizQuestion.length,
      };
    }),
  getQuestion: protectedProcedure
    .input(z.object({ quiz_id: z.string(), number: z.number() }))
    .query(async ({ ctx, input }) => {
      const quiz = await prisma.quiz.findFirst({
        include: {
          QuizQuestion: true,
        },
        where: {
          id: input.quiz_id,
        },
      });

      if (!quiz) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "quiz not found",
        });
      }
      const quizUser = await prisma.doQuiz.findFirst({
        where: {
          user_id: ctx.user.id,
          quiz_id: input.quiz_id,
        },
      });
      if (!quizUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you haven't start this quiz yet",
        });
      }

      const question = await prisma.quizQuestion.findFirst({
        select: {
          DoQuizAnswer: {
            where: {
              user_id: ctx.user.id,
            },
          },
          QuizQuestionChoice: true,
          question: true,
          number: true,
        },
        where: {
          quiz_id: input.quiz_id,
          number: input.number,
        },
      });
      if (!question) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "question not found",
        });
      }

      return {
        quiz_id: input.quiz_id,
        question: question.question,
        number: question.number,
        choices: question.QuizQuestionChoice.map((item) => ({
          id: item.id,
          choice: item.choice,
          answer: item.answer,
        })),
        your_answer:
          question.DoQuizAnswer.length > 0
            ? question.DoQuizAnswer[0].answer
            : null,
      };
    }),
  answerQuestion: protectedProcedure
    .input(
      z.object({
        quiz_id: z.string(),
        quiz_question_id: z.string(),
        answer: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const quizUser = await prisma.doQuiz.findFirst({
        where: {
          user_id: ctx.user.id,
          quiz_id: input.quiz_id,
          finish_at: null,
        },
      });
      if (!quizUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you haven't start this quiz yet or quiz already finished",
        });
      }

      const existingAnswer = await prisma.doQuizAnswer.findFirst({
        where: {
          quiz_question_id: input.quiz_question_id,
          user_id: ctx.user.id,
        },
      });

      if (existingAnswer) {
        await prisma.doQuizAnswer.updateMany({
          where: {
            quiz_question_id: input.quiz_question_id,
            user_id: ctx.user.id,
          },
          data: {
            answer: input.answer,
          },
        });
        return null;
      } else {
        await prisma.doQuizAnswer.create({
          data: {
            id: uuidv4(),
            do_quiz_id: quizUser.id,
            quiz_id: input.quiz_id,
            quiz_question_id: input.quiz_question_id,
            user_id: ctx.user.id,
            answer: input.answer,
          },
        });

        return null;
      }
    }),
});
