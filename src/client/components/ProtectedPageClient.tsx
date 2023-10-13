"use client";
/*
This component authorize user on client side (browser), 
I recommend use ProtectedPage instead
*/
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { trpc } from "../utils/trpc";
import Cookies from "js-cookie";

export default function ProtectedPage({ children }: { children: ReactNode }) {
    const router = useRouter();
    const isLogin = useUserStore((state) => state.isLogin);
    const setUser = useUserStore((state) => state.setUser);
    const removeUser = useUserStore((state) => state.removeUser);

    const me = trpc.auth.me.useQuery(undefined, {
        retry: 0,
    });
    
    // check is user login (has token)
    useEffect(() => {
        let token = Cookies.get('trpc_auth');
        if (token === null) {
            router.push("/login");
            return
        } else {
            me.refetch()
        }
    }, [isLogin])

    // set user data
    useEffect(() => {
        let token = Cookies.get('trpc_auth');
        if (me.status === "success" && token !== undefined) {
            setUser({
                id: me.data.id,
                username: me.data.username,
                email: me.data.email,
                token: token
            })
        } else if (me.status === "error" || token === undefined) {
            removeUser()
        }
    }, [me.status])

    return children;
}