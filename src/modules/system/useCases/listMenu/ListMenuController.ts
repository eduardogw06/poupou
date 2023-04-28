import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMenuUseCase } from "./ListMenuUseCase";
import { getUserIdFromAuthHeader } from "../../../../utils/getUserIdFromAuthHeader";

class ListMenuController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const listMenuUseCase = container.resolve(ListMenuUseCase);
        const categories = await listMenuUseCase.execute(user_id, true);

        return response.json(categories);
    }
}

export { ListMenuController }