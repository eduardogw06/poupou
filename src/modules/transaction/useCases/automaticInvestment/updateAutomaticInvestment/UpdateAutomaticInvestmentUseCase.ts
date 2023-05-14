import { inject, injectable } from "tsyringe";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";

interface IRequest {
    user_id: string;
    automatic_investment_id: string;
    target_id: string;
    amount: number;
    day: number;
    active: boolean;
}


@injectable()
class UpdateAutomaticInvestmentUseCase {
    constructor(
        @inject("AutomaticInvestmentsRepository")
        private automaticInvestmentsRepository: AutomaticInvestmentsRepository
    ) { }

    async execute({
        user_id,
        automatic_investment_id,
        target_id,
        amount,
        day,
        active
    }: IRequest): Promise<void> {
        const automatic_investment = await this.automaticInvestmentsRepository.findById(user_id, automatic_investment_id, true);

        if (automatic_investment) {
            automatic_investment.target_id = target_id ?? automatic_investment.target_id;
            automatic_investment.amount = amount ?? automatic_investment.amount;
            automatic_investment.day = day ?? automatic_investment.day;
            automatic_investment.active = active ?? automatic_investment.active;

            await this.automaticInvestmentsRepository.save(automatic_investment);
        }
    }
}

export { UpdateAutomaticInvestmentUseCase };
