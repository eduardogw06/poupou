import { classToClass } from "class-transformer";
import { IListAutomaticInvestmentDTO } from "../dtos/IListAutomaticInvestmentDTO";
import { IAutomaticInvestmentResponseDTO } from "../dtos/IAutomaticInvestmentResponseDTO";

class AutomaticInvestmentMap {
    static toDTO({
        automatic_investments_uuid,
        target_uuid,
        target_description,
        automatic_investments_amount,
        automatic_investments_day,
        automatic_investments_active
    }: IListAutomaticInvestmentDTO): IAutomaticInvestmentResponseDTO {
        const automatic_investment = classToClass({
            uuid: automatic_investments_uuid,
            target: {
                uuid: target_uuid,
                description: target_description,
            },
            amount: automatic_investments_amount,
            day: automatic_investments_day,
            active: automatic_investments_active
        });

        return automatic_investment;
    }
}

export { AutomaticInvestmentMap }