import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTargetUseCase } from "./CreateTargetUseCase";

class CreateTargetController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            description,
            category_id,
            user_id,
            target_amount,
            date_begin,
            date_end
        } = request.body;

        const createTargetUseCase = container.resolve(CreateTargetUseCase);

        await createTargetUseCase.execute({
            description,
            category_id,
            user_id,
            target_amount,
            date_begin,
            date_end
        })

        return response.status(201).send();
    }
}


export { CreateTargetController }