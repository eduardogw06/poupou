import { Repository, getRepository } from "typeorm";
import { ITransactionTypeRepository } from "../ITransactionTypeRepository";
import { TransactionType } from "../../entities/TransactionType";

class TransactionTypeRepository implements ITransactionTypeRepository {
    private repository: Repository<TransactionType>;

    constructor() {
        this.repository = getRepository(TransactionType);
    }

    async list(type?: "Aporte" | "Retirada"): Promise<TransactionType[]> {
        const params = type ? { description: type } : {};
        return this.repository.find(params);
    }
}

export { TransactionTypeRepository }