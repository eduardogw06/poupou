import { Request, Response } from "express";
import { container } from "tsyringe";
import { getUserIdFromAuthHeader } from "../../../../utils/getUserIdFromAuthHeader";
import { UpdateUserPasswordUseCase } from "./updateUserPasswordUseCase";

interface IPayload {
    sub: string;
}

class UpdateUserPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { oldPassword, newPassword, newPasswordConfirm } = request.body;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const updateUserPasswordUseCase = container.resolve(UpdateUserPasswordUseCase);

        await updateUserPasswordUseCase.execute({ user_id, oldPassword, newPassword, newPasswordConfirm });

        return response.status(200).send();
    }
}

export { UpdateUserPasswordController }