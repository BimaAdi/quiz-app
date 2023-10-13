import { lucia } from "lucia";
import { nextjs_future } from "lucia/middleware";
import { prisma } from "@lucia-auth/adapter-prisma";
import { github } from "@lucia-auth/oauth/providers";
import { prisma as client } from "@/server/db/prisma";

export const auth = lucia({
  adapter: prisma(client),
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),

  sessionCookie: {
    expires: false,
  },

  getUserAttributes: (data) => {
    return {
      username: data.username as string,
      email: data.email as string,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? ""
});

export type Auth = typeof auth;
