
import { getRepository, Repository } from "typeorm";
import { sendMail } from "../../../../utils/sendMail";
import { UsersRepository } from "../../../accounts/repositories/implementations/UsersRepository";
import { EmailsRepository } from "../../../system/repositories/implementations/EmailsRepository";
import { Transaction } from "../../../transaction/entities/Transaction";
import { TransactionType } from "../../../transaction/entities/TransactionType";
import { ICreateTargetsDTO } from "../../dtos/ICreateTargetsDTO";
import { ISelectedTarget, ITargetProgress } from "../../dtos/ITargetResponseDTO";
import { Category } from "../../entities/Category";
import { Target } from "../../entities/Target";
import { ITargetsRepository } from "../ITargetsRepository";

class TargetsRepository implements ITargetsRepository {
    private repository: Repository<Target>;

    constructor() {
        this.repository = getRepository(Target);
    }

    async create({
        description,
        category_id,
        user_id,
        target_amount,
        date_begin,
        date_end
    }: ICreateTargetsDTO): Promise<void> {
        const target = this.repository.create({
            description,
            category_id,
            user_id,
            target_amount,
            date_begin,
            date_end
        });

        const savedTarget = await this.repository.save(target);

        if (savedTarget) {
            const emailsRepository = new EmailsRepository();
            const newTargetEmail = await emailsRepository.findById(process.env.NEW_TARGET_EMAIL);

            const usersRepository = new UsersRepository();
            const user = await usersRepository.findById(user_id);

            if (newTargetEmail && user) {

                sendMail({
                    to: user.email,
                    from: process.env.FROM_EMAIL,
                    subject: newTargetEmail.subject,
                    content: newTargetEmail.content
                        .replace('[name]', user.name)
                        .replace('[target_name]', description)
                });
            }
        }
    }

    async list(user_id: string): Promise<ISelectedTarget[]> {
        return await this.repository
            .createQueryBuilder("targets")
            .innerJoinAndSelect(
                Category,
                "category",
                "targets.category_id = category.uuid::text"
            )
            .select(["targets.uuid", "targets.description", "targets.category_id", "category.icon", "targets.user_id", "targets.target_amount", "targets.date_begin", "targets.date_end"])
            .where('targets.user_id = :user_id', { user_id: user_id })
            .orderBy("targets.created_at")
            .getRawMany();
    }

    async findById(user_id: string, id: string, onlyTarget: boolean = false): Promise<ISelectedTarget | Target> {
        const query = this.repository
            .createQueryBuilder("targets")
            .innerJoinAndSelect(
                Category,
                "category",
                "targets.category_id = category.uuid::text"
            )
            .select(["targets.uuid", "targets.description", "targets.category_id", "category.description as category", "category.icon as category_icon", "targets.user_id", "targets.target_amount", "targets.date_begin", "targets.date_end"])
            .where('targets.user_id = :user_id', { user_id: user_id })
            .andWhere('targets.uuid = :uuid', { uuid: id })

        if (onlyTarget) return await query.getOne();

        return await query.getRawOne();
    }

    async findByCategory(category_id: string): Promise<ISelectedTarget[]> {
        const query = this.repository
            .createQueryBuilder("targets")
            .innerJoinAndSelect(
                Category,
                "category",
                "targets.category_id = category.uuid::text"
            )
            .select(["targets.uuid", "targets.description", "targets.category_id", "category.icon as category_icon", "targets.user_id", "targets.target_amount", "targets.date_begin", "targets.date_end"])
            .where('category.uuid = :uuid', { uuid: category_id })

        return await query.getRawMany();
    }

    async listTargetProgress(user_id: string): Promise<ITargetProgress[]> {
        return await this.repository
            .createQueryBuilder("targets")
            .leftJoinAndSelect(
                Transaction,
                "transactions",
                "targets.uuid::text = transactions.target_id"
            )
            .leftJoinAndSelect(
                TransactionType,
                "transaction_type",
                "transaction_type.uuid::text = transactions.type_id and transaction_type.description = 'Aporte'"
            )
            .select(["targets.uuid", "targets.description", "targets.target_amount", "coalesce(sum(transactions.amount), 0) as total_saved", "coalesce(round(100*sum(transactions.amount)/targets.target_amount), 0) as target_percent"])
            .where("targets.user_id = :user_id", { user_id: user_id })
            .groupBy("targets.uuid")
            .addGroupBy("targets.description")
            .addGroupBy("targets.target_amount")
            .addGroupBy("transactions.target_id")
            .getRawMany();
    }

    async save(target: Target): Promise<void> {
        await this.repository.save(target);
    }

    async delete(target: Target): Promise<void> {
        await this.repository.remove(target);
    }
}

export { TargetsRepository };
