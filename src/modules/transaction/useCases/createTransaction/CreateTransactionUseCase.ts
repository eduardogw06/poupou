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
        target_id,
        type,
        amount,
        date
    }: ICreateTransactionDTO): Promise<void> {
        await this.transactionsRepository.create({
            target_id,
            type,
            amount,
            date
        });
    }
}

export { CreateTransactionUseCase }