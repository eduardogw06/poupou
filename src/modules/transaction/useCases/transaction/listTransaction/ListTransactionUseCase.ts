import { ITransactionsRepository } from "@modules/transaction/repositories/ITransactionsRepository";
import { inject, injectable } from "tsyringe";
import { IListTransactionsDTO } from "../../../dtos/IListTransactionsDTO";
import { ITransactionResponseDTO } from "../../../dtos/ITransactionResponseDTO";
import { TransactionMap } from "../../../mapper/TransactionMap";

interface IRequest {
    user_id: string;
    target_id?: string;
    transaction_id?: string;
}

@injectable()
class ListTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository
    ) { }

    async execute({ user_id, target_id, transaction_id }: IRequest) {
        let transactions = []

        if (transaction_id) {
            const transaction = await this.transactionsRepository.findById(user_id, transaction_id, false);
            transactions.push(transaction);
        } else if (target_id) {
            transactions = await this.transactionsRepository.list(user_id, target_id);
        } else {
            transactions = await this.transactionsRepository.list(user_id);
        }

        return transactions.map((transaction: IListTransactionsDTO): ITransactionResponseDTO => TransactionMap.toDTO(transaction));
    }
}

export { ListTransactionUseCase };
