import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTargetUseCase } from "./DeleteTargetUseCase";

class DeleteTargetController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { target_id } = request.body;

        const deleteTargetUseCase = container.resolve(DeleteTargetUseCase);
        await deleteTargetUseCase.execute(target_id);

        return response.status(204).send();
    }
}

export { DeleteTargetController }