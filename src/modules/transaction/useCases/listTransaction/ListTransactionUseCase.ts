import { inject, injectable } from "tsyringe";
import { IListTransactionsDTO } from "../../dtos/IListTransactionsDTO";
import { ITransactionResponseDTO } from "../../dtos/ITransactionResponseDTO";
import { TransactionMap } from "../../mapper/TransactionMap";
import { TransactionsRepository } from "../../repositories/implementations/TransactionsRepository";

interface IRequest {
    target_id?: string;
    transaction_id?: string;
}

@injectable()
class ListTransactionUseCase {
    constructor(
        @inject("TransactionsRepository")
        private transactionsRepository: TransactionsRepository
    ) { }

    async execute({ target_id, transaction_id }: IRequest) {
        let transactions = []

        if (transaction_id) {
            const transaction = await this.transactionsRepository.findById(transaction_id);
            transactions.push(transaction);
        } else {
            transactions = await this.transactionsRepository.list(target_id);
        }

        return transactions.map((transaction: IListTransactionsDTO): ITransactionResponseDTO => TransactionMap.toDTO(transaction));
    }
}

export { ListTransactionUseCase }