interface ICreateTransactionDTO {
    user_id: string;
    target_id: string;
    type: "Aporte" | "Retirada";
    amount: number;
    date: Date;
}

export { ICreateTransactionDTO }