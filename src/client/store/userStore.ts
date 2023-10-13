import { create } from "zustand";
import Cookies from "js-cookie";

interface IUser {
    id: string,
    email: string,
    username: string,
    token: string
}

interface userState {
    isLogin: boolean,
    user: IUser | null,
    login: (userData: IUser) => void,
    logout: () => void,
    checkToken: () => void,
    setUser: (userData: IUser) => void,
    removeUser: () => void,
}

export const useUserStore = create<userState>((set) => ({
    isLogin: false,
    user: null,
    login: (userData) => {
        // localStorage.setItem("trpc_auth", userData.token);
        Cookies.set("auth_session", userData.token)
        set({ user: userData, isLogin: true });
    },
    logout: () => {
        // localStorage.removeItem("trpc_auth");
        Cookies.remove("auth_session")
        set({ user: null, isLogin: false });
    },
    checkToken: () => {
        // const token = localStorage.getItem("trpc_auth");
        const token = Cookies.get("auth_session");
        if (token && token?.trim() !== "") {
            set((state) => ({ user: state.user, isLogin: true }))
        } else {
            set({ user: null, isLogin: false })
        }
    },
    setUser: (userData) => {
        set({ user: userData, isLogin: true })
    },
    removeUser: () => {
        set({ user: null, isLogin: false })
    }
}))