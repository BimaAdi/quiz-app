import { auth } from "@/server/auth/lucia";
import { NextRequest, NextResponse } from "next/server";
import * as context from "next/headers";
import { LuciaError } from "lucia";


export const POST = async (request: NextRequest) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    
    try {
        const key = await auth.useKey("email", email?.toString() || "", password?.toString() || ""); 
        const session = await auth.createSession({
            userId: key.userId,
            attributes: {}
        });
        const authRequest = auth.handleRequest(request.method, context);
        authRequest.setSession(session); // context.cookies().set("auth_session", session.sessionId)
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/app", // redirect to profile page
                getSetCookie: ""
            }
        });
    } catch (e) {
        console.log(e);
        if (e instanceof LuciaError && (e.message === "AUTH_INVALID_KEY_ID" || e.message === "AUTH_INVALID_PASSWORD")) {
            // user does not exist or invalid password
            return NextResponse.json(
                {
                    error: "Incorrect username or password"
                },
                {
                    status: 400
                }
            );
        }
        return NextResponse.json(
            {
                error: "An unknown error occurred"
            },
            {
                status: 500
            }
        );
    }
}