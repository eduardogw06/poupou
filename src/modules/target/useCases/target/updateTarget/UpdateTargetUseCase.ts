import { inject, injectable } from "tsyringe";
import { IUpdateTargetsDTO } from "../../../dtos/IUpdateTargetDTO";
import { TargetsRepository } from "../../../repositories/implementations/TargetsRepository";
import { Target } from "../../../entities/Target";

@injectable()
class UpdateTargetUseCase {
    constructor(
        @inject("TargetsRepository")
        private targetsRepository: TargetsRepository
    ) { }


    async execute({
        target_id,
        description,
        category_id,
        user_id,
        target_amount,
        date_begin,
        date_end
    }: IUpdateTargetsDTO): Promise<void> {
        const target = await this.targetsRepository.findById(user_id, target_id, true) as Target;

        target.description = description ?? target.description;
        target.category_id = category_id ?? target.category_id;
        target.user_id = user_id ?? target.user_id;
        target.target_amount = target_amount ?? target.target_amount;
        target.date_begin = date_begin ?? target.date_begin;
        target.date_end = date_end ?? target.date_end;

        await this.targetsRepository.save(target);
    }
}

export { UpdateTargetUseCase }