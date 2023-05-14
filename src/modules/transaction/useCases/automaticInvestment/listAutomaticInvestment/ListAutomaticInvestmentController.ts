import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAutomaticInvestmentUseCase } from "./ListAutomaticInvestmentUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class ListAutomaticInvestmentController {
    async handle(request: Request, response: Response) {
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const listAutomaticInvestmentUseCase = container.resolve(ListAutomaticInvestmentUseCase);
        const automaticInvestment = await listAutomaticInvestmentUseCase.execute(user_id)

        return response.json(automaticInvestment);
    }
}

export { ListAutomaticInvestmentController }