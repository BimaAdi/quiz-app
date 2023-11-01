import { z } from "zod";
import { prisma } from "../db/prisma";
import { protectedProcedure, router } from "../utils/trpcRouter";

export const solveQuizRouter = router({
  getListSolveQuiz: protectedProcedure.query(async ({ ctx }) => {
    const data = await prisma.doQuiz.findMany({
      include: {
        quiz: true,
      },
      where: {
        user_id: ctx.user.id,
      },
    });

    return data.map((x) => {
      return {
        ...x,
        start_at: x.start_at?.toISOString(),
        finish_at: x.finish_at?.toISOString(),
        quiz: {
          ...x.quiz,
          publish_start_at: x.quiz.publish_start_at?.toISOString(),
          publish_end_at: x.quiz.publish_end_at?.toISOString(),
          created_at: x.quiz.created_at.toISOString(),
          updated_at: x.quiz.updated_at.toISOString(),
        },
      };
    });
  }),
  getDetailSolveQuiz: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userQuizStatus = await prisma.doQuiz.findFirst({
        include: {
          quiz: true,
        },
        where: {
          user_id: ctx.user.id,
          quiz_id: input,
        },
      });
      console.log(userQuizStatus)
      if (userQuizStatus === null) {
        return null;
      }
      return {
        ...userQuizStatus,
        start_at: userQuizStatus.start_at?.toISOString(),
        finish_at: userQuizStatus.finish_at?.toISOString(),
        quiz: {
          ...userQuizStatus.quiz,
          publish_start_at: userQuizStatus.quiz.publish_start_at?.toISOString(),
          publish_end_at: userQuizStatus.quiz.publish_end_at?.toISOString(),
          created_at: userQuizStatus.quiz.created_at.toISOString(),
          updated_at: userQuizStatus.quiz.updated_at.toISOString(),
        },
      };
    }),
});
