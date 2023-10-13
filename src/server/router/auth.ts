import { z } from "zod";
import bcrypt from "bcrypt";
import {
  protectedProcedure,
  publicProcedure,
  router,
} from "@/server/utils/trpcRouter";
import { prisma } from "@/server/db/prisma";
import { TRPCError } from "@trpc/server";
import { decodeJwtToken, generateJwtToken } from "@/server/utils/jwt_utils";
import { auth } from "../auth/lucia";
import { LuciaError } from "lucia";

type LuciaSession = {
  user: {
    username: string, userId: string
  },
  sessionId: string,
}

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .output(
      z.object({
        id: z.string(),
        email: z.string(),
        username: z.string(),
        token: z.string()
      })
    )
    .mutation(async ({ input: { email, password } }) => {
      try {
        const key = await auth.useKey("email", email, password);
        const session = await auth.createSession({
          userId: key.userId,
          attributes: {}
        }) as LuciaSession;
        return {
          id: session.user.userId,
          email,
          username: session.user.username,
          token: session.sessionId
        };
      } catch (e) {
        if (e instanceof LuciaError && (e.message === "AUTH_INVALID_KEY_ID" || e.message === "AUTH_INVALID_PASSWORD")) {
          // user does not exist or invalid password
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid Credentials",
          })
        };
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unknown error occurred",
        });
      }
    }),
  signUp: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const new_user = await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: input.email,
          password: input.password,
        },
        attributes: {
          username: input.username,
          email: input.email,
        },
      });

      return {
        id: new_user.userId as string,
        username: input.username,
        email: input.email,
      };
    }),
  me: protectedProcedure.query(({ ctx }) => {
    return {
      id: ctx.user.id,
      email: ctx.user.email,
      username: ctx.user.username,
    };
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await auth.invalidateSession(ctx.session?.id || "")
    } catch (e) {
      
    }
    return null
  }),
  meServer: publicProcedure
    .input(z.object({ auth_token: z.string() }))
    .mutation(async ({ input }) => {
      const payload = decodeJwtToken({ token: input.auth_token });
      if (!payload) {
        return {
          user: null,
        };
      }

      const user = await prisma.user.findFirst({
        where: {
          id: payload.id.toString(),
        },
      });

      if (user === null) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        username: user.username,
      };
    }),
});
