import { inject, injectable } from "tsyringe";
import { IAutomaticInvestmentResponseDTO } from "../../../dtos/IAutomaticInvestmentResponseDTO";
import { IListAutomaticInvestmentDTO } from "../../../dtos/IListAutomaticInvestmentDTO";
import { AutomaticInvestmentMap } from "../../../mapper/AutomaticInvestmentMap";
import { AutomaticInvestmentsRepository } from "../../../repositories/implementations/AutomaticInvestmentsRepository";

@injectable()
class ListAutomaticInvestmentUseCase {
    constructor(
        @inject("AutomaticInvestmentsRepository")
        private automaticInvestmentsRepository: AutomaticInvestmentsRepository
    ) { }

    async execute(user_id: string): Promise<IAutomaticInvestmentResponseDTO[]> {
        const automatic_investments = await this.automaticInvestmentsRepository.list(user_id);

        return automatic_investments.map((automatic_investment: IListAutomaticInvestmentDTO): IAutomaticInvestmentResponseDTO => AutomaticInvestmentMap.toDTO(automatic_investment));
    }
}

export { ListAutomaticInvestmentUseCase };
