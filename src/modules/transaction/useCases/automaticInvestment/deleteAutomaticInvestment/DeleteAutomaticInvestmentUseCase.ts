import { inject, injectable } from "tsyringe";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";

@injectable()
class DeleteAutomaticInvestmentUseCase {
    constructor(
        @inject("AutomaticInvestmentsRepository")
        private automaticInvestmentsRepository: AutomaticInvestmentsRepository
    ) { }

    async execute(user_id: string, automatic_investment_id: string): Promise<void> {
        const automatic_investment = await this.automaticInvestmentsRepository.findById(user_id, automatic_investment_id, true);
        await this.automaticInvestmentsRepository.delete(automatic_investment);
    }
}

export { DeleteAutomaticInvestmentUseCase };
