import { getRepository, Repository } from "typeorm";
import { TargetsRepository } from "../../../target/repositories/implementations/TargetsRepository";
import { ICreateAutomaticInvesmentDTO } from "../../dtos/ICreateAutomaticInvesmentDTO";
import { IListAutomaticInvestmentDTO } from "../../dtos/IListAutomaticInvestmentDTO";
import { AutomaticInvestment } from "../../entities/AutomaticInvestment";
import { IAutomaticInvestmentsRepository } from "../IAutomaticInvestmentsRepository";


class AutomaticInvestmentsRepository implements IAutomaticInvestmentsRepository {
    private repository: Repository<AutomaticInvestment>;

    constructor() {
        this.repository = getRepository(AutomaticInvestment);
    }

    async create({
        user_id,
        target_id,
        amount,
        day
    }: ICreateAutomaticInvesmentDTO): Promise<void> {
        const targetsRepository = new TargetsRepository();
        const target = await targetsRepository.findById(user_id, target_id);

        if (target) {
            const automatic_investment = this.repository.create({
                target_id,
                amount,
                day,
                active: true
            });

            await this.repository.save(automatic_investment);
        }
    }

    async list(user_id: string): Promise<IListAutomaticInvestmentDTO[]> {
        const query = this.repository.createQueryBuilder("automatic_investments")
            .innerJoinAndSelect(
                "targets",
                "target",
                "target.uuid::text=automatic_investments.target_id"
            )
            .select(["automatic_investments.uuid", "target.uuid", "target.description", "target.user_id", "automatic_investments.amount", "automatic_investments.day", "automatic_investments.active"])
            .where("target.user_id::text = :user_id", { user_id });
        query.orderBy("automatic_investments.created_at");

        return await query.getRawMany();
    }

    async findById(user_id: string, automatic_investment_id: string, onlyAutomaticInvesment: boolean): Promise<AutomaticInvestment> {
        const query = this.repository.createQueryBuilder("automatic_investments")
            .innerJoinAndSelect(
                "targets",
                "target",
                "target.uuid::text=automatic_investments.target_id"
            )
            .select(["automatic_investments.uuid", "automatic_investments.target_id", "target.description", "target.user_id", "automatic_investments.amount", "automatic_investments.day", "automatic_investments.active"])
            .where("target.user_id::text = :user_id", { user_id })
            .andWhere("automatic_investments.uuid::text = :automatic_investment_id", { automatic_investment_id });

        if (onlyAutomaticInvesment)
            return await query.getOne();

        return await query.getRawOne();
    }

    async findByDay(day: number, active: boolean): Promise<IListAutomaticInvestmentDTO[]> {
        const query = this.repository.createQueryBuilder("automatic_investments")
            .innerJoinAndSelect(
                "targets",
                "target",
                "target.uuid::text=automatic_investments.target_id"
            )
            .select([
                "automatic_investments.uuid", "automatic_investments.target_id", "target.description", "target.user_id", "automatic_investments.amount", "automatic_investments.day", "automatic_investments.active"
            ])
            .where("automatic_investments.day = :day", { day })
            .andWhere("automatic_investments.active = :active", { active });

        return await query.getRawMany();
    }

    async save(automatic_investment: AutomaticInvestment): Promise<void> {
        await this.repository.save(automatic_investment);
    }

    async delete(automatic_investment: AutomaticInvestment): Promise<void> {
        await this.repository.remove(automatic_investment);
    }
}

export { AutomaticInvestmentsRepository };
