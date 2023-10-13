"use client";
import { FormEvent, useState } from "react";
import { trpc } from "@/client/utils/trpc";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    username: HTMLInputElement;
    password: HTMLInputElement;
    confirm_password: HTMLInputElement;
}

export default function SignUp({ onClickLogin }: { onClickLogin: () => void }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const signUp = trpc.auth.signUp.useMutation({
        onError: (err) => {
            alert(err.message);
        },
        onSuccess(data, variables, context) {
            onClickLogin();
            console.log(data.id)
            // me.refetch();
        },
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const elements = e.currentTarget.elements as FormElements;
        if (elements.password.value !== elements.confirm_password.value) {
            setErrorMessage("password and confirm password not same")
            return
        }
        signUp.mutate({
            username: elements.username.value,
            email: elements.email.value,
            password: elements.password.value,
        });
    };


    return (
        <div className="border border-solid border-slate-400 bg-white" style={{ minWidth: "300px" }}>
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
                    <div className="text-lg">Username:</div>
                    <div>
                        <input
                            className="border border-solid border-slate-400 text-lg w-full p-1"
                            type="text"
                            name="username"
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
                <div className="py-2">
                    <div className="text-lg">Confirm Password:</div>
                    <div>
                        <input
                            className="border border-solid border-slate-400 text-lg w-full p-1"
                            type="password"
                            name="confirm_password"
                            required
                        />
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        className="bg-blue-950 w-full text-white text-lg p-1"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </div>
                <div>Already have an account <span className="text-blue-500 hover:cursor-pointer" onClick={() => onClickLogin()}>Login</span></div>
            </form>
        </div>
    );
}
