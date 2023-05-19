import { inject, injectable } from "tsyringe";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";
import { AppError } from "@errors/AppError";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";

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
        if (!automatic_investment) throw new AppError("Usuário não encontrado ou aporte automático não pertence ao usuário informado.");

        const targetsRepository = new TargetsRepository();
        const target = await targetsRepository.findById(user_id, target_id);
        if (!target) throw new AppError("Selecione o objetivo a ser investido.");

        if (Number(amount) < 10) throw new AppError("O valor mínimo para um aporte é de R$ 10,00.");

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
