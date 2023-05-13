import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTransactionUseCase } from "./ListTransactionUseCase";
import { getUserIdFromAuthHeader } from "../../../../../utils/getUserIdFromAuthHeader";

class ListTransactionController {
    async handle(request: Request, response: Response) {
        const { target_id, transaction_id } = request.query;
        const user_id = getUserIdFromAuthHeader(request.headers.authorization);

        const listTransactionUseCase = container.resolve(ListTransactionUseCase);
        const transactions = await listTransactionUseCase.execute({
            user_id: user_id,
            target_id: target_id as string,
            transaction_id: transaction_id as string,
        })

        return response.json(transactions);
    }
}

export { ListTransactionController }