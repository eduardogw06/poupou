import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class CreateTransactionController {
    async handle(request: Request, response: Response) {
        const {
            target_id,
            type,
            amount,
            date
        } = request.body;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const createTransactionUseCase = container.resolve(CreateTransactionUseCase);
        await createTransactionUseCase.execute({
            user_id,
            target_id,
            type,
            amount,
            date
        });

        return response.status(201).send();
    }
}

export { CreateTransactionController }