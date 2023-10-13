import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";

export const generateJwtToken = ({
    id,
    username,
    email,
}: {
    id: number;
    username: string;
    email: string;
}): string => {
    if (!process.env.JWT_SECRET) {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "",
        });
    }
    return jwt.sign({ data: { id, email, username } }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
    });
};

export const decodeJwtToken = ({
    token,
}: {
    token: string;
}): { id: number; email: string; username: string } | null => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "",
            });
        }
        let err = null;
        let payload: { id: number; email: string; username: string } | null = null;
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ["HS256"] },
            function (err, decoded) {
                err = err;
                let type_decoded = decoded as {
                    data: { id: number; email: string; username: string };
                    iat: number;
                    exp: number;
                };
                payload = type_decoded.data;
            }
        );
        if (err) {
            return null;
        }
        return payload;
    } catch {
        return null;
    }
};
