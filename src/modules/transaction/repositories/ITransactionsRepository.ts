import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { IUpdateTransactionsDTO } from "../dtos/IUpdateTransactionsDTO";
import { Transaction } from "../entities/Transaction";


interface ITransactionsRepository {
    create(data: ICreateTransactionDTO): Promise<void>;
    list(user_id: string): Promise<Transaction[]>;
    findById(id: string, onlyTransaction: boolean): Promise<Transaction>;
    save(target: IUpdateTransactionsDTO): Promise<void>;
    delete(target: Transaction): Promise<void>;
}

export { ITransactionsRepository };
