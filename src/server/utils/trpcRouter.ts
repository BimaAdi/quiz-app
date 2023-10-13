import { TRPCError, initTRPC } from "@trpc/server";
import { typeCreateContext } from "../context";


const t = initTRPC.context<typeCreateContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure
 **/
const isAuthed = t.middleware((opts) => {
    const { ctx } = opts;
    if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return opts.next({
        ctx: {
            user: ctx.user,
        },
    });
});

export const protectedProcedure = t.procedure.use(isAuthed);