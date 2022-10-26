import { classToClass } from 'class-transformer';
import { ICategoryResponseDTO } from '../dtos/ICategoryResponseDTO';
import { Category } from '../entities/Category';

class CategoryMap {
    static toDTO({
        uuid,
        description,
        active,
        icon
    }: Category): ICategoryResponseDTO {
        const category = classToClass({
            uuid,
            description,
            active,
            icon
        });
        return category;
    }
}

export { CategoryMap };
