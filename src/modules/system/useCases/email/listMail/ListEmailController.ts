import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMailUseCase } from "./ListEmailUseCase";

class ListEmailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email_id } = request.query;

        const listMailUseCase = container.resolve(ListMailUseCase);
        const emails = await listMailUseCase.execute({ email_id: email_id as string });

        return response.json(emails);
    }
}

export { ListEmailController };
