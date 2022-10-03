import { Request, Response } from "express";
import { container } from "tsyringe";
import { getUserIdFromAuthHeader } from "../../../../utils/getUserIdFromAuthHeader";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

interface IPayload {
    sub: string;
}

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, dark_theme } = request.body;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        await updateUserUseCase.execute({ user_id, name, email, dark_theme });

        return response.status(201).send();
    }
}

export { UpdateUserController }