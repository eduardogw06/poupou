import { getRepository, Repository } from "typeorm";
import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { IUpdateTransactionsDTO } from "../../dtos/IUpdateTransactionsDTO";
import { Transaction } from "../../entities/Transaction";
import { ITransactionsRepository } from "../ITransactionsRepository";
import { TransactionTypeRepository } from "./TransactionTypeRepository";
import { EmailsRepository } from "../../../system/repositories/implementations/EmailsRepository";
import { UsersRepository } from "../../../accounts/repositories/implementations/UsersRepository";
import { sendMail } from "../../../../utils/sendMail";
import { TargetsRepository } from "../../../target/repositories/implementations/TargetsRepository";
import { Target } from "../../../target/entities/Target";
import { numberToReal } from "../../../../utils/numberToReal";


class TransactionsRepository implements ITransactionsRepository {
    private repository: Repository<Transaction>;

    constructor() {
        this.repository = getRepository(Transaction);
    }

    async create({
        user_id,
        target_id,
        type,
        amount,
        date
    }: ICreateTransactionDTO): Promise<void> {
        const transactionTypeRepository = new TransactionTypeRepository();
        const transactionType = await transactionTypeRepository.list(type);

        if (transactionType.length) {
            const transaction = this.repository.create({
                target_id,
                type_id: transactionType[0].uuid,
                amount,
                date
            });

            const savedTransaction = await this.repository.save(transaction);

            if (savedTransaction) {
                const emailsRepository = new EmailsRepository();
                const newTransactionEmail = await emailsRepository.findById(process.env.NEW_REGISTER_EMAIL);

                const usersRepository = new UsersRepository();
                const user = await usersRepository.findById(user_id);

                const targetsRepository = new TargetsRepository();
                const target = await targetsRepository.findById(user_id, target_id, true) as Target;

                if (newTransactionEmail && user) {

                    sendMail({
                        to: user.email,
                        from: process.env.FROM_EMAIL,
                        subject: newTransactionEmail.subject,
                        content: newTransactionEmail.content
                            .replace('[transaction_amount]', numberToReal(Number(amount)))
                            .replace('[target_name]', target.description)
                    });
                }
            }
        }
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

    async getTransactionTotal(user_id: string): Promise<number> {
        const queryResult = await this.repository.createQueryBuilder('transactions')
            .innerJoinAndSelect(
                "targets",
                "target",
                "target.uuid::text=transactions.target_id"
            )
            .select('SUM(transactions.amount)', 'sum')
            .where('target.user_id::text = :user_id', { user_id })
            .getRawOne();

        return Number(queryResult.sum) || 0;
    };

    async save(transaction: IUpdateTransactionsDTO): Promise<void> {
        await this.repository.save(transaction);
    }

    async delete(transaction: Transaction): Promise<void> {
        await this.repository.remove(transaction);
    }
}

export { TransactionsRepository };
