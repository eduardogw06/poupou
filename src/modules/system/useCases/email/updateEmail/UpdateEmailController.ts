import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateMailUseCase } from "./UpdateEmailUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class UpdateEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email_id, description, warning, subject, content, active } = request.body;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const updateMailUseCase = container.resolve(UpdateMailUseCase);
        await updateMailUseCase.execute({ user_id, email_id, description, warning, subject, content, active });

        return response.status(201).send();
    }
}

export { UpdateEmailController };
