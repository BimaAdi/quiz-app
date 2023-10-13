import { redirect } from "next/navigation";
import { PropsWithChildren, ReactNode } from "react";
import { cookies } from "next/headers";
import { appRouter } from "@/server/router";

export default function ProtectedPage({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("trpc_auth");
  if (!token) {
    redirect("/login");
  }

  // there still bug in async component
  // async component can only be used on app folder
  // see https://stackoverflow.com/questions/74855447/error-next-13-typescript-with-fetching-data-inside-async-component
  // For now I moved all protected page logic to src/app/app/layout.tsx
  appRouter
    .createCaller({ user: null, session: null })
    .auth.meServer({ auth_token: token.value })
    .then((user) => {
      if (!user) {
        redirect("/login");
      }
    });

  return children;
}
