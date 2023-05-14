export interface IListAutomaticInvestmentDTO {
    automatic_investments_uuid: string;
    automatic_investments_target_id: string;
    target_description: string;
    target_user_id: string;
    automatic_investments_amount: number;
    automatic_investments_day: number;
    automatic_investments_active: boolean;
}