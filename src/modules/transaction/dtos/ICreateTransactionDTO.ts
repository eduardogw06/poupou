interface ICreateTransactionDTO {
    target_id: string;
    type_id: string;
    amount: number;
    date: Date;
}

export { ICreateTransactionDTO }