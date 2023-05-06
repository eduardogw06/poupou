import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { active } = request.query;
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);
        const categories = await listCategoryUseCase.execute(Boolean(active));

        return response.json(categories);
    }
}

export { ListCategoryController }