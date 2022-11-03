interface IListTransactionsDTO {
    transactions_uuid: string;
    transactions_target_id: string;
    transactions_amount: string;
    transactions_date: string;
    target_description: string;
    type_uuid: string;
    type_description: string
}

export { IListTransactionsDTO }