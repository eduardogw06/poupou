import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { category_id, description, active, icon } = request.body;

        const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

        await updateCategoryUseCase.execute({ category_id, description, active, icon });

        return response.status(201).send();
    }
}

export { UpdateCategoryController };
