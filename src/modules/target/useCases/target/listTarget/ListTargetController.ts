import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTargetUseCase } from "./ListTargetUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class ListTargetController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { target_id } = request.query;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const listTargetUseCase = container.resolve(ListTargetUseCase);
        const targets = await listTargetUseCase.execute({
            user_id: user_id as string,
            target_id: target_id as string
        });

        return response.json(targets);
    }
}

export { ListTargetController }