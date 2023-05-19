import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { IListTransactionsDTO } from "../dtos/IListTransactionsDTO";
import { IUpdateTransactionsDTO } from "../dtos/IUpdateTransactionsDTO";
import { Transaction } from "../entities/Transaction";


interface ITransactionsRepository {
    create(data: ICreateTransactionDTO): Promise<void>;
    list(user_id: string, target_id?: string): Promise<IListTransactionsDTO[]>;
    findById(user_id: string, id: string, onlyTransaction: boolean): Promise<Transaction>;
    getTransactionTotal(userId: string): Promise<number>;
    save(target: Transaction): Promise<void>;
    delete(target: Transaction): Promise<void>;
}

export { ITransactionsRepository };
