import { inject, injectable } from "tsyringe";
import { TransactionsRepository } from "../../repositories/implementations/TransactionsRepository";

@injectable()
class DeleteTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: TransactionsRepository
    ) { }

    async execute(user_id: string, transaction_id: string): Promise<void> {
        const transaction = await this.transactionsRepository.findById(user_id, transaction_id, true);
        await this.transactionsRepository.delete(transaction);
    }
}

export { DeleteTransactionUseCase }