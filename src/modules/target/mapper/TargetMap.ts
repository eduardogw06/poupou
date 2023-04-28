import { classToClass } from 'class-transformer';
import { ISelectedTarget, ITargetResponseDTO } from '../dtos/ITargetResponseDTO';

class TargetMap {
    static toDTO({
        targets_uuid,
        targets_description,
        targets_category_id,
        category_icon,
        targets_user_id,
        targets_target_amount,
        targets_date_begin,
        targets_date_end,
    }: ISelectedTarget): ITargetResponseDTO {
        const target = classToClass({
            uuid: targets_uuid,
            description: targets_description,
            category_id: targets_category_id,
            category_icon,
            user_id: targets_user_id,
            target_amount: targets_target_amount,
            date_begin: targets_date_begin,
            date_end: targets_date_end,
        });
        return target;
    }
}

export { TargetMap };
