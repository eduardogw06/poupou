import { classToClass } from 'class-transformer';
import { IMenuResponseDTO } from '../dtos/IMenuResponse.DTO';
import { Menu } from '../entities/Menu';
class MenuMap {
    static toDTO({
        name,
        url,
        icon,
        admin_only,
        active
    }: Menu): IMenuResponseDTO {
        const menu = classToClass({
            name,
            url,
            icon,
            admin_only,
            active
        });
        return menu;
    }
}

export { MenuMap };
