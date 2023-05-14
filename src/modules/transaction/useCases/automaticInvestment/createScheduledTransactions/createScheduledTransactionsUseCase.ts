import { inject, injectable } from "tsyringe";
import { IListAutomaticInvestmentDTO } from "../../../dtos/IListAutomaticInvestmentDTO";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";
import { TransactionsRepository } from "../../../repositories/implementations/TransactionsRepository";

@injectable()
class CreateScheduledTransactionsUseCase {
    constructor(
        @inject("AutomaticInvestmentsRepository")
        private automaticInvestmentsRepository: AutomaticInvestmentsRepository
    ) { }

    async execute(): Promise<void> {
        const day = new Date().getDate();
        const automaticsInvestments = await this.automaticInvestmentsRepository.findByDay(day, true);

        if (automaticsInvestments) {
            automaticsInvestments.map(async (automaticsInvestment: IListAutomaticInvestmentDTO) => {

                const transactionsRepository = new TransactionsRepository();
                await transactionsRepository.create({
                    user_id: automaticsInvestment.target_user_id,
                    target_id: automaticsInvestment.automatic_investments_target_id,
                    type: "Aporte",
                    amount: automaticsInvestment.automatic_investments_amount,
                    date: new Date()
                });

            });
        }
    }
}

export { CreateScheduledTransactionsUseCase };
