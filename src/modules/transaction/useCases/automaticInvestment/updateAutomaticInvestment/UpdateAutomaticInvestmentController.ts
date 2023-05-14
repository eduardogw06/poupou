import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAutomaticInvestmentUseCase } from "./UpdateAutomaticInvestmentUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class UpdateAutomaticInvestmentController {
    async handle(request: Request, response: Response) {
        const {
            automatic_investment_id,
            target_id,
            amount,
            day,
            active
        } = request.body;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const updateAutomaticInvestmentUseCase = container.resolve(UpdateAutomaticInvestmentUseCase);
        await updateAutomaticInvestmentUseCase.execute({
            user_id,
            automatic_investment_id,
            target_id,
            amount,
            day,
            active
        });
        return response.status(201).send();
    }
}

export { UpdateAutomaticInvestmentController } 