import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import * as context from "next/headers";
import { redirect } from "next/navigation";
import DashboardLayout from "@/client/layout/DashboardLayout";
import { auth } from "@/server/auth/lucia";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "quiz app",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_session");
  if (!token) {
    redirect("/login");
  }

  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) {
    redirect("/login")
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}
