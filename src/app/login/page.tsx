"use client";
import { useState } from "react";
import Login from "@/client/components/Login";
import SignUp from "@/client/components/SignUp";

export default function LoginPage() {
    const [page, setPage] = useState<"Login" | "SignUp">("Login");
    return (
        <div className="w-screen min-h-screen flex bg-slate-200">
            {/* left */}
            <div className="hidden lg:block w-full bg-blue-950"></div>
            {/* right */}
            <div className="w-full grid place-items-center bg-slate-200">
                {page === "Login" ? <Login onClickSignUp={() => setPage("SignUp")} /> : <SignUp onClickLogin={() => setPage("Login")} />}
            </div>
        </div>
    );
}
