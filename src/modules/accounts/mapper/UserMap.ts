import { classToClass } from 'class-transformer';
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../entities/User";

class UserMap {
    static toDTO({
        name,
        email,
        photo,
        is_admin,
        dark_theme
    }: User): IUserResponseDTO {
        const user = classToClass({
            name,
            email,
            photo,
            is_admin,
            dark_theme
        });
        return user;
    }
}

export { UserMap };