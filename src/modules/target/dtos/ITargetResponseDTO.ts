interface ITargetResponseDTO {
    uuid: string;
    description: string;
    category_id: string;
    category_icon: string;
    user_id: string;
    target_amount: number;
    total_saved: number;
    target_percent: number;
    date_begin: Date;
    date_end: Date;
}

interface ISelectedTarget {
    targets_uuid: string;
    targets_description: string;
    targets_category_id: string;
    category_icon: string;
    targets_user_id: string;
    targets_target_amount: number;
    targets_date_begin: Date;
    targets_date_end: Date;
}

interface ITargetProgress {
    targets_uuid: string,
    targets_description: string,
    targets_target_amount: number,
    total_saved: number,
    target_percent: number
}

export { ITargetResponseDTO, ISelectedTarget, ITargetProgress };
