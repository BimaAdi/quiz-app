"use client";
import { ReactNode } from "react";
import Footer from "../components/home/Footer";
import AppNavbar from "../components/app/AppNavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen relative bg-slate-200">
      <AppNavbar />
      <main className="px-5 pt-5 pb-20">{children}</main>
      <Footer />
    </div>
  );
}
