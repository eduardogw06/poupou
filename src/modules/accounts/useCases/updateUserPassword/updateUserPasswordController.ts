import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserPasswordUseCase } from "./updateUserPasswordUseCase";

interface IPayload {
    sub: string;
}

class UpdateUserPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, oldPassword, newPassword, newPasswordConfirm } = request.body;
        const updateUserPasswordUseCase = container.resolve(UpdateUserPasswordUseCase);

        await updateUserPasswordUseCase.execute({ email, oldPassword, newPassword, newPasswordConfirm });

        return response.status(201).send();
    }
}

export { UpdateUserPasswordController }