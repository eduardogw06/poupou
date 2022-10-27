import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTargetUseCase } from "./ListTargetUseCase";

class ListTargetController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id, target_id } = request.query;
        const listTargetUseCase = container.resolve(ListTargetUseCase);
        const targets = await listTargetUseCase.execute({
            user_id: user_id as string,
            target_id: target_id as string
        });

        return response.json(targets);
    }
}

export { ListTargetController }