import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTransactionUseCase } from "./UpdateTransactionUseCase";
import { getUserIdFromAuthHeader } from "../../../../utils/getUserIdFromAuthHeader";

class UpdateTransactionController {
    async handle(request: Request, response: Response) {
        const {
            transaction_id,
            target_id,
            type_id,
            amount,
            date
        } = request.body;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const updateTransactionUseCase = container.resolve(UpdateTransactionUseCase);
        await updateTransactionUseCase.execute({
            user_id,
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