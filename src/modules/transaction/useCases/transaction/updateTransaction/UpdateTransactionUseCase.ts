import { inject, injectable } from "tsyringe";
import { TransactionsRepository } from "../../../repositories/implementations/TransactionsRepository";

interface IRequest {
    user_id: string;
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
        user_id,
        transaction_id,
        target_id,
        type_id,
        amount,
        date
    }: IRequest): Promise<void> {
        const transaction = await this.transactionsRepository.findById(user_id, transaction_id, true);

        transaction.target_id = target_id ?? transaction.target_id;
        transaction.type_id = type_id ?? transaction.type_id;
        transaction.amount = amount ?? transaction.amount;
        transaction.date = date ?? transaction.date;

        await this.transactionsRepository.save(transaction);
    }
}

export { UpdateTransactionUseCase }