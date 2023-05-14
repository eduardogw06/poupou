interface IUpdateTransactionsDTO {
    transaction_id: string;
    user_id: string;
    target_id: string;
    type: "Aporte" | "Retirada";
    amount: number;
    date: Date;
}

export { IUpdateTransactionsDTO }