import { inject, injectable } from "tsyringe";
import { ITargetsRepository } from "../../../repositories/ITargetsRepository";

interface IRequest {
    description: string;
    category_id: string;
    user_id: string;
    target_amount: number;
    date_begin: string;
    date_end: string;
}


@injectable()
class CreateTargetUseCase {
    constructor(
        @inject("TargetsRepository")
        private targetsRepository: ITargetsRepository,
    ) { }
    async execute({
        description,
        category_id,
        user_id,
        target_amount,
        date_begin,
        date_end
    }: IRequest): Promise<void> {
        await this.targetsRepository.create({
            description,
            category_id,
            user_id,
            target_amount,
            date_begin,
            date_end
        });
    }
}

export { CreateTargetUseCase };
