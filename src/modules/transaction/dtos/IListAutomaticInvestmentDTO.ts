export interface IListAutomaticInvestmentDTO {
    automatic_investments_uuid: string;
    target_uuid: string;
    target_description: string;
    automatic_investments_amount: number;
    automatic_investments_day: number;
    automatic_investments_active: boolean;
}