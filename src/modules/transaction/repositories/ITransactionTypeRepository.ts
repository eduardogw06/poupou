import { TransactionType } from "../entities/TransactionType";

interface ITransactionTypeRepository {
    list(type?: "Aporte" | "Retirada"): Promise<TransactionType[]>;
}

export { ITransactionTypeRepository };