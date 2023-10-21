import type { Session } from "lucia";
import { prisma } from "@/server/db/prisma";

export const getUserFromLuciaSession = async (
  lucia_session: Session | null
) => {
  if (!lucia_session) {
    return {
      user: null,
      session: null,
    };
  }
  
  const session = await prisma.session.findFirst({
    include: {
      user: true,
    },
    where: {
      id: lucia_session.sessionId,
    },
  });

  return {
    user: session?.user,
    session: session,
  };
};
