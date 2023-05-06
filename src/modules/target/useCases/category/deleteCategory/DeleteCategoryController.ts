import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class DeleteCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { category_id } = request.query;
        const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);
        await deleteCategoryUseCase.execute(category_id as string);

        return response.status(204).send();
    }

}


export { DeleteCategoryController }