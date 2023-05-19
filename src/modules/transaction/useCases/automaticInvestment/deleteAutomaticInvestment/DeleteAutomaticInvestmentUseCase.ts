import { inject, injectable } from "tsyringe";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";
import { AppError } from "@errors/AppError";

@injectable()
class DeleteAutomaticInvestmentUseCase {
    constructor(
        @inject("AutomaticInvestmentsRepository")
        private automaticInvestmentsRepository: AutomaticInvestmentsRepository
    ) { }

    async execute(user_id: string, automatic_investment_id: string): Promise<void> {
        const automatic_investment = await this.automaticInvestmentsRepository.findById(user_id, automatic_investment_id, true);
        if (!automatic_investment) throw new AppError("Usuário não encontrado ou o aporte automático não pertence ao usuário informado.");

        await this.automaticInvestmentsRepository.delete(automatic_investment);
    }
}

export { DeleteAutomaticInvestmentUseCase };
