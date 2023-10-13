import { prisma } from "@/server/db/prisma";
import * as context from "next/headers";
import { auth } from "./auth/lucia";

export const createContext = async () => {
    const authRequest = auth.handleRequest("GET", context);
    const lucia_session = await authRequest.validate();
    if (!lucia_session) {
        return {
            user: null,
            session: null
        }
    }

    const session = await prisma.session.findFirst({
        include: {
            user: true
        },
        where: {
            id: lucia_session.sessionId,
        }
    })

    return {
        user: session?.user,
        session: session
    }
}

export type typeCreateContext = typeof createContext;
