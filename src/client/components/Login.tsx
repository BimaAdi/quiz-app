"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/client/utils/trpc";
import { useUserStore } from "@/client/store/userStore";
import { AiFillGithub } from 'react-icons/ai';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

export default function Login({ onClickSignUp }: { onClickSignUp: () => void }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();

    const loginStore = useUserStore((state) => state.login);

    const login = trpc.auth.login.useMutation({
        onError: (err) => {
            setErrorMessage(err.message)
        },
        onSuccess(data, variables, context) {
            loginStore(data);
            router.push("/app")
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements as FormElements;
        login.mutate({
            email: elements.email.value,
            password: elements.password.value,
        });
    };

    return (
        <div className="border border-solid border-slate-400 bg-white min-w-[300px]">
            <form onSubmit={(e) => onSubmit(e)} className="m-2">
                <div className="py-2 w-full text-center font-bold text-xl">Welcome</div>
                {errorMessage ? <div className="text-center text-red-500">{errorMessage}</div> : <></>}
                <div className="py-2">
                    <div className="text-lg">Email:</div>
                    <div>
                        <input
                            className="border border-solid border-slate-400 text-lg w-full p-1"
                            type="text"
                            name="email"
                            required
                        />
                    </div>
                </div>
                <div className="py-2">
                    <div className="text-lg">Password:</div>
                    <div>
                        <input
                            className="border border-solid border-slate-400 text-lg w-full p-1"
                            type="password"
                            name="password"
                            required
                        />
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        className="bg-blue-950 w-full text-white text-lg p-1"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
            <div className="border border-1 border-slate-400 m-2"></div>
            <div className="m-2">
                <div className="pt-2">
                    <a
                        className="bg-blue-950 w-full text-white text-lg p-1 flex items-center justify-center gap-2"
                        href="/login/github"
                    >
                        <p>Login with Github</p>
                        <AiFillGithub style={{ width: "25px", height: "25px" }} />
                    </a>
                </div>
            </div>
            <div className="m-2">
                <div>No account <span className="text-blue-500 hover:cursor-pointer" onClick={() => onClickSignUp()}>SignUp</span></div>
            </div>
        </div>
    );
}