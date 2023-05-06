import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

class CreateTransactionController {
    async handle(request: Request, response: Response) {
        const {
            target_id,
            type,
            amount,
            date
        } = request.body;
        const createTransactionUseCase = container.resolve(CreateTransactionUseCase);
        await createTransactionUseCase.execute({
            target_id,
            type,
            amount,
            date
        });

        return response.status(201).send();
    }
}

export { CreateTransactionController }