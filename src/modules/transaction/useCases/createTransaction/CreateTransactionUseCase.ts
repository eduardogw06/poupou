import { inject, injectable } from "tsyringe";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { TransactionsRepository } from "../../repositories/implementations/TransactionsRepository";

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