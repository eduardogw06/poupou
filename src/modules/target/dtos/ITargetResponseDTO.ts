interface ITargetResponseDTO {
    uuid: string;
    description: string;
    category_id: string;
    user_id: string;
    target_amount: number;
    date_begin: Date;
    date_end: Date;
}

export { ITargetResponseDTO };
