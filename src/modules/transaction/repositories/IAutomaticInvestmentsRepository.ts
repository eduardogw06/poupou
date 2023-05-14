import { ICreateAutomaticInvesmentDTO } from "../dtos/ICreateAutomaticInvesmentDTO";
import { IListAutomaticInvestmentDTO } from "../dtos/IListAutomaticInvestmentDTO";
import { AutomaticInvestment } from "../entities/AutomaticInvestment";


interface IAutomaticInvestmentsRepository {
    create(data: ICreateAutomaticInvesmentDTO): Promise<void>;
    list(user_id: string): Promise<IListAutomaticInvestmentDTO[]>;
    findById(user_id: string, automatic_investment_id: string, onlyAutomaticInvesment: boolean): Promise<AutomaticInvestment>;
    findByDay(day: number, active: boolean): Promise<IListAutomaticInvestmentDTO[]>
    save(automatic_investment: AutomaticInvestment): Promise<void>;
    delete(automatic_investment: AutomaticInvestment): Promise<void>;
}

export { IAutomaticInvestmentsRepository };
