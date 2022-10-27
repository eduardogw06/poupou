import { classToClass } from 'class-transformer';
import { ITargetResponseDTO } from '../dtos/ITargetResponseDTO';
import { Target } from '../entities/Target';

class TargetMap {
    static toDTO({
        uuid,
        description,
        category_id,
        user_id,
        target_amount,
        date_begin,
        date_end,
    }: Target): ITargetResponseDTO {
        const target = classToClass({
            uuid,
            description,
            category_id,
            user_id,
            target_amount,
            date_begin,
            date_end,
        });
        return target;
    }
}

export { TargetMap };
