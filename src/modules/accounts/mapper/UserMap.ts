import { classToClass } from 'class-transformer';
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../entities/User";
import { Achievements } from '../../../utils/getAchivements';

class UserMap {
    static toDTO({
        uuid,
        name,
        email,
        photo,
        is_admin,
        dark_theme,
        created_at
    }: User, achievements: Achievements): IUserResponseDTO {
        const user = classToClass({
            uuid,
            name,
            email,
            photo,
            is_admin,
            dark_theme,
            created_at,
            achievements
        });
        return user;
    }
}

export { UserMap };