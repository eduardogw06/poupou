import { getRepository, Repository } from "typeorm";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { IUpdateTransactionsDTO } from "../../dtos/IUpdateTransactionsDTO";
import { Transaction } from "../../entities/Transaction";
import { ITransactionsRepository } from "../ITransactionsRepository";


class TransactionsRepository implements ITransactionsRepository {
    private repository: Repository<Transaction>;

    constructor() {
        this.repository = getRepository(Transaction);
    }

    async create({
        target_id,
        type_id,
        amount,
        date
    }: ICreateTransactionDTO): Promise<void> {
        const transaction = this.repository.create({
            target_id,
            type_id,
            amount,
            date
        });

        await this.repository.save(transaction);
    }

    async list(user_id: string, target_id?: string): Promise<Transaction[]> {
        const query = this.repository.createQueryBuilder("transactions")
            .innerJoinAndSelect(
                "targets",
                "target",
                "target.uuid::text=transactions.target_id"
            )
            .innerJoinAndSelect(
                "transaction_type",
                "type",
                "type.uuid::text=transactions.type_id"
            )
            .select(["transactions.uuid", "transactions.target_id", "target.description", "type.uuid", "type.description", "transactions.amount", "transactions.date"])
            .where("target.user_id::text = :user_id", { user_id });
        if (target_id) query.andWhere("target.uuid::text = :target_id", { target_id });
        query.orderBy("transactions.date");

        return await query.getRawMany();
    }

    async findById(user_id: string, id: string, onlyTransaction: boolean): Promise<Transaction> {
        const query = this.repository.createQueryBuilder("transactions")
            .innerJoinAndSelect(
                "targets",
                "target",
                "target.uuid::text=transactions.target_id"
            )
            .innerJoinAndSelect(
                "transaction_type",
                "type",
                "type.uuid::text=transactions.type_id"
            )
            .select(["transactions.uuid", "transactions.target_id", "target.description", "transactions.type_id", "type.description", "transactions.amount", "transactions.date"])
            .where("target.user_id::text = :user_id", { user_id })
            .andWhere("transactions.uuid::text = :id", { id })
            .orderBy("transactions.date");

        if (onlyTransaction)
            return await query.getOne();

        return await query.getRawOne();
    }

    async save(transaction: IUpdateTransactionsDTO): Promise<void> {
        await this.repository.save(transaction);
    }

    async delete(transaction: Transaction): Promise<void> {
        await this.repository.remove(transaction);
    }
}

export { TransactionsRepository };
