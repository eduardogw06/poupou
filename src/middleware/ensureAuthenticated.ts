import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { getUserIdFromAuthHeader } from "../utils/getUserIdFromAuthHeader";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const user_id = getUserIdFromAuthHeader(request.headers.authorization);

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
        throw new AppError("User does not exists", 401);
    }

    request.user = {
        uuid: user_id
    }

    next()
}