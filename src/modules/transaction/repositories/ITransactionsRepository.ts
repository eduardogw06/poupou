import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { IUpdateTransactionsDTO } from "../dtos/IUpdateTransactionsDTO";
import { Transaction } from "../entities/Transaction";


interface ITransactionsRepository {
    create(data: ICreateTransactionDTO): Promise<void>;
    list(target_id?: string): Promise<Transaction[]>;
    findById(user_id: string, id: string, onlyTransaction: boolean): Promise<Transaction>;
    getTransactionTotal(userId: string): Promise<number>;
    save(target: IUpdateTransactionsDTO): Promise<void>;
    delete(target: Transaction): Promise<void>;
}

export { ITransactionsRepository };
