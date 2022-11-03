import { classToClass } from "class-transformer";
import { IListTransactionsDTO } from "../dtos/IListTransactionsDTO";
import { ITransactionResponseDTO } from "../dtos/ITransactionResponseDTO";




class TransactionMap {
    static toDTO({
        transactions_uuid,
        transactions_target_id,
        transactions_amount,
        transactions_date,
        target_description,
        type_uuid,
        type_description,
    }: IListTransactionsDTO): ITransactionResponseDTO {
        const transaction = classToClass({
            uuid: transactions_uuid,
            target: {
                uuid: transactions_target_id,
                description: target_description,
            },
            type: {
                uuid: type_uuid,
                description: type_description,
            },
            amount: transactions_amount,
            date: transactions_date
        });

        return transaction;
    }
}

export { TransactionMap } 