import { Request, Response } from "express";
import { container } from "tsyringe";
import { PasswordRecoveryUseCase } from "./PasswordRecoveryUseCase";

class PasswordRecoveryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const passwordRecoveryUseCase = container.resolve(PasswordRecoveryUseCase);
        await passwordRecoveryUseCase.execute(email);

        return response.status(200).send();
    }
}

export { PasswordRecoveryController };
