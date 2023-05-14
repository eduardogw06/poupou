import { inject, injectable } from "tsyringe";
import { TransactionsRepository } from "../../../repositories/implementations/TransactionsRepository";
import { ICreateTransactionDTO } from "../../../dtos/ICreateTransactionDTO";

@injectable()
class CreateTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: TransactionsRepository
    ) { }

    async execute({
        user_id,
        target_id,
        type,
        amount,
        date
    }: ICreateTransactionDTO): Promise<void> {
        await this.transactionsRepository.create({
            user_id,
            target_id,
            type,
            amount,
            date
        });
    }
}

export { CreateTransactionUseCase }