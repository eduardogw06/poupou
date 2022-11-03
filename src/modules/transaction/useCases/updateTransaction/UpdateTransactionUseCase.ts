import { inject, injectable } from "tsyringe";
import { TransactionsRepository } from "../../repositories/implementations/TransactionsRepository";

interface IRequest {
    transaction_id: string;
    target_id: string;
    type_id: string;
    amount: number;
    date: Date;
}


@injectable()
class UpdateTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: TransactionsRepository
    ) { }

    async execute({
        transaction_id,
        target_id,
        type_id,
        amount,
        date
    }: IRequest): Promise<void> {
        const transaction = await this.transactionsRepository.findById(transaction_id);

        transaction.target_id = target_id ?? transaction.target_id;
        transaction.type_id = type_id ?? transaction.type_id;
        transaction.amount = amount ?? transaction.amount;
        transaction.date = date ?? transaction.date;

        await this.transactionsRepository.save(transaction);
    }
}

export { UpdateTransactionUseCase }