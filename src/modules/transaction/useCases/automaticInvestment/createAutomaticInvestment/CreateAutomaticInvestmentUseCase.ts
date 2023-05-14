import { inject, injectable } from "tsyringe";
import { ICreateAutomaticInvesmentDTO } from "../../../dtos/ICreateAutomaticInvesmentDTO";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";

@injectable()
class CreateAutomaticInvestmentUseCase {
    constructor(
        @inject("AutomaticInvestmentsRepository")
        private automaticInvestmentsRepository: AutomaticInvestmentsRepository
    ) { }

    async execute({
        user_id,
        target_id,
        amount,
        day,
    }: ICreateAutomaticInvesmentDTO): Promise<void> {
        await this.automaticInvestmentsRepository.create({
            user_id,
            target_id,
            amount,
            day
        });
    }
}

export { CreateAutomaticInvestmentUseCase };
