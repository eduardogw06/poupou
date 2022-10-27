
import { getRepository, Repository } from "typeorm";
import { ICreateTargetsDTO } from "../../dtos/ICreateTargetsDTO";
import { IUpdateTargetsDTO } from "../../dtos/IUpdateTargetDTO";
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

        await this.repository.save(target);
    }

    async list(user_id: string): Promise<Target[]> {
        return await this.repository.find({ user_id })
    }

    async findById(id: string): Promise<Target> {
        return await this.repository.findOne(id);
    }

    async save(target: IUpdateTargetsDTO): Promise<void> {
        await this.repository.save(target);
    }

    async delete(target: Target): Promise<void> {
        await this.repository.remove(target);
    }
}

export { TargetsRepository };
