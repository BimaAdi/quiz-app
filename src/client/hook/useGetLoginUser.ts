import { useEffect } from "react";
import { useUserStore } from "@/client/store/userStore";
import { trpc } from "@/client/utils/trpc";
import Cookies from "js-cookie";

export function useGetLoginUser() {
    const isLogin = useUserStore((state) => state.isLogin);
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const removeUser = useUserStore((state) => state.removeUser);

    const me = trpc.auth.me.useQuery(undefined, {
        retry: 0,
    });

    // check is user login (has token)
    useEffect(() => {
        // let token = localStorage.getItem('trpc_auth');
        me.refetch()
    }, [isLogin])

    // set user data
    useEffect(() => {
        let token = Cookies.get('auth_session')?.trim() || "";
        if (me.status === "success" && token !== null) {
            setUser({
                id: me.data.id,
                username: me.data.username,
                email: me.data.email,
                token: token
            })
        } else if (me.status === "error" || token === null) {
            removeUser()
        }
    }, [me.status])

    return {
        isLogin,
        user,
        isLoading: me.isLoading
    }
}