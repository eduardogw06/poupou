interface IUpdateAutomaticInvesmentDTO {
    automatic_investment_id: string;
    user_id: string;
    target_id: string;
    amount: number;
    day: number;
    active: boolean;
}

export { IUpdateAutomaticInvesmentDTO }