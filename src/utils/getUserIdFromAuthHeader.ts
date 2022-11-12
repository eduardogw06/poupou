import { Request } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload {
    sub: string;
}

const getUserIdFromAuthHeader = (authHeader: string): string => {
    const { SECRET_TOKEN } = process.env;

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(
            token.replace(/["]/g, ''),
            SECRET_TOKEN,
        ) as IPayload

        return user_id;
    } catch {
        throw new AppError("Invalid token", 401);
    }

}

export { getUserIdFromAuthHeader }