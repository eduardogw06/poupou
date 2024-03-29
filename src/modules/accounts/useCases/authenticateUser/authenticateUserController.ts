import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        const userData = await authenticateUserUseCase.execute({
            email,
            password,
        });

        return response.json(userData);
    }
}

export { AuthenticateUserController };