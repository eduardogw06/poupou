import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAutomaticInvestmentUseCase } from "./DeleteAutomaticInvestmentUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class DeleteAutomaticInvestmentController {
    async handle(request: Request, response: Response) {
        const { automatic_investment_id } = request.query;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);
        const deleteAutomaticInvestmentUseCase = container.resolve(DeleteAutomaticInvestmentUseCase);
        await deleteAutomaticInvestmentUseCase.execute(user_id, automatic_investment_id as string);

        return response.status(204).send();
    }
}

export { DeleteAutomaticInvestmentController }