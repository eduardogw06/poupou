import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTransactionUseCase } from "./DeleteTransactionUseCase";
import { getUserIdFromAuthHeader } from "../../../../utils/getUserIdFromAuthHeader";

class DeleteTransactionController {
    async handle(request: Request, response: Response) {
        const { transaction_id } = request.query;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);
        const deleteTransactionUseCase = container.resolve(DeleteTransactionUseCase);
        await deleteTransactionUseCase.execute(user_id, transaction_id as string);

        return response.status(204).send();
    }
}

export { DeleteTransactionController }