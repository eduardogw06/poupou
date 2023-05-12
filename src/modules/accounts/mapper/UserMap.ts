import { classToClass } from 'class-transformer';
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../entities/User";

class UserMap {
    static toDTO({
        uuid,
        name,
        email,
        photo,
        is_admin,
        dark_theme,
        created_at
    }: User): IUserResponseDTO {
        const user = classToClass({
            uuid,
            name,
            email,
            photo,
            is_admin,
            dark_theme,
            created_at
        });
        return user;
    }
}

export { UserMap };