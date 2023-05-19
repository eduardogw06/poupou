import { AppError } from "@errors/AppError";
import { ITransactionsRepository } from "@modules/transaction/repositories/ITransactionsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository
    ) { }

    async execute(user_id: string, transaction_id: string): Promise<void> {
        const transaction = await this.transactionsRepository.findById(user_id, transaction_id, true);
        if (!transaction) throw new AppError("Usuário não encontrado ou o aporte não pertence ao usuário informado.");


        await this.transactionsRepository.delete(transaction);
    }
}

export { DeleteTransactionUseCase };
