import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTransactionUseCase } from "./UpdateTransactionUseCase";

class UpdateTransactionController {
    async handle(request: Request, response: Response) {
        const {
            transaction_id,
            target_id,
            type_id,
            amount,
            date
        } = request.body;

        const updateTransactionUseCase = container.resolve(UpdateTransactionUseCase);
        await updateTransactionUseCase.execute({
            transaction_id,
            target_id,
            type_id,
            amount,
            date
        });
        return response.status(201).send();
    }
}

export { UpdateTransactionController } 