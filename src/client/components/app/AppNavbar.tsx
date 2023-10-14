"use client";
import { useGetLoginUser } from "@/client/hook/useGetLoginUser";
import { useUserStore } from "@/client/store/userStore";
import Link from "next/link";
import { useState } from "react";

export default function AppNavbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const user = useUserStore((state) => state.user);
  const { isLogin } = useGetLoginUser();

  return (
    <>
      <header
        className="flex justify-between items-center min-w-screen top-0 sticky bg-blue-950"
        style={{ minHeight: "65px" }}
      >
        <form
          id="logoutForm"
          className="hidden"
          method="POST"
          action="/api/logout"
        ></form>
        <div className="text-xl text-white p-5">Logo</div>
        <ul className="hidden md:flex gap-x-2 items-center p-5">
          {isLogin ? (
            <li className="text-white text-md cursor-pointer">
              <input
                type="submit"
                form="logoutForm"
                name="Logout"
                className="cursor-pointer"
                value="Logout"
              />
            </li>
          ) : (
            <li className="text-white text-md cursor-pointer">
              <Link href={"/login"}>Login</Link>
            </li>
          )}
        </ul>
        <div
          className="block md:hidden space-y-2 p-2 rounded border-solid border mx-5 border-white hover:cursor-pointer"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <div className="w-8 h-0.5 bg-white"></div>
          <div className="w-8 h-0.5 bg-white"></div>
          <div className="w-8 h-0.5 bg-white"></div>
        </div>
      </header>
      {/* responsive navbar */}
      <div
        className={
          isNavOpen
            ? "block md:hidden w-screen bg-blue-950 p-5"
            : "hidden w-screen bg-blue-950 p-5"
        }
      >
        <ul className="flex flex-col gap-2">
          {user ? (
            <li className="text-white text-md cursor-pointer">
              <input
                type="submit"
                form="logoutForm"
                name="Logout"
                className="cursor-pointer"
                value="Logout"
              />
            </li>
          ) : (
            <li className="text-white text-md">
              <Link href={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
