"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/client/store/userStore";
import { trpc } from "../utils/trpc";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const router = useRouter()
    const [isNavOpen, setIsNavOpen] = useState(false);

    const logout = useUserStore((state) => state.logout)

    const logoutMutation = trpc.auth.logout.useMutation({
        onSettled: () => {
            logout()
            router.push("/login")
        }
    });

    return (
        <div className="min-w-screen min-h-screen relative bg-slate-200 md:flex">
            {/* Sidebar */}
            <aside
                className={
                    isNavOpen
                        ? "z-10 md:z-0 absolute md:static top-0 bg-blue-950 h-screen text-white left-0"
                        : "z-10 md:z-0 absolute md:static top-0 bg-blue-950 h-screen text-white left-0 hidden"
                }
                style={{ width: "300px" }}
            >
                <ul className="flex flex-col p-5 gap-2">
                    <li
                        className="text-white text-lg font-bold text-right hover:cursor-pointer md:hidden"
                        onClick={() => setIsNavOpen(false)}
                    >
                        X
                    </li>
                    <li className="hidden md:block" style={{ minHeight: "40px" }}></li>
                    <li className="text-white text-lg hover:cursor-pointer"><Link href={"/"}>Home</Link></li>
                    <li className="text-white text-lg hover:cursor-pointer"><Link href={"/app"}>Dashboard</Link></li>
                    <li className="text-white text-lg hover:cursor-pointer">
                        <form id="logoutForm" className="hidden" method="POST" action="/api/logout"></form>
                        <input type="submit" form="logoutForm" name="Logout" className="cursor-pointer" value="Logout" />
                    </li>
                </ul>
            </aside>

            <div className="w-full relative min-h-screen">
                {/* Navbar */}
                <header
                    className="flex justify-between items-center min-w-screen top-0 sticky bg-blue-950"
                    style={{ minHeight: "65px" }}
                >
                    <div
                        className="block space-y-2 p-2 rounded border-solid border mx-5 border-white hover:cursor-pointer"
                        onClick={() => setIsNavOpen(!isNavOpen)}
                    >
                        <div className="w-8 h-0.5 bg-white"></div>
                        <div className="w-8 h-0.5 bg-white"></div>
                        <div className="w-8 h-0.5 bg-white"></div>
                    </div>
                    <div className="text-xl text-white p-5">Logo</div>
                </header>
                {/* main */}
                <main className="m-2 bg-white">
                    {children}
                </main>
                {/* Footer */}
                <footer className="w-full text-center text-white p-2 absolute bottom-0 bg-black">
                    layout 2023
                </footer>
            </div>
        </div>
    );
}