import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAutomaticInvestmentUseCase } from "./CreateAutomaticInvestmentUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class CreateAutomaticInvestmentController {
    async handle(request: Request, response: Response) {
        const {
            target_id,
            amount,
            day
        } = request.body;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const createAutomaticInvestmentUseCase = container.resolve(CreateAutomaticInvestmentUseCase);
        await createAutomaticInvestmentUseCase.execute({
            user_id,
            target_id,
            amount,
            day
        });

        return response.status(201).send();
    }
}

export { CreateAutomaticInvestmentController }