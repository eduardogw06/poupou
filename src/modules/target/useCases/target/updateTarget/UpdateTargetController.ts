import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTargetUseCase } from "./UpdateTargetUseCase";

class UpdateTargetController {
    async handle(request: Request, response: Response) {
        const {
            target_id,
            description,
            category_id,
            user_id,
            target_amount,
            date_begin,
            date_end
        } = request.body;

        const updateTargetUseCase = container.resolve(UpdateTargetUseCase);

        await updateTargetUseCase.execute({
            target_id,
            description,
            category_id,
            user_id,
            target_amount,
            date_begin,
            date_end
        });

        return response.status(201).send();
    }
}


export { UpdateTargetController }