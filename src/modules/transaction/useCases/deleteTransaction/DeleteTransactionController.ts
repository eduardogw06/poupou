import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTransactionUseCase } from "./DeleteTransactionUseCase";

class DeleteTransactionController {
    async handle(request: Request, response: Response) {
        const { transaction_id } = request.body;
        const deleteTransactionUseCase = container.resolve(DeleteTransactionUseCase);
        await deleteTransactionUseCase.execute(transaction_id);

        return response.status(204).send();
    }
}

export { DeleteTransactionController }