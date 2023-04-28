import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTargetUseCase } from "./DeleteTargetUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class DeleteTargetController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { target_id } = request.query;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);
        const deleteTargetUseCase = container.resolve(DeleteTargetUseCase);
        await deleteTargetUseCase.execute(user_id, target_id as string);

        return response.status(204).send();
    }
}

export { DeleteTargetController }