import { ICreateMenusDTO } from "../dtos/ICreateMenusDTO";
import { IUpdateMenusDTO } from "../dtos/IUpdateMenuDTO";
import { Menu } from "../entities/Menu";

interface IMenusRepository {
    create(data: ICreateMenusDTO): Promise<void>;
    list(activeOnly: boolean, adminOnly: boolean): Promise<Menu[]>;
    findById(id: string): Promise<Menu>;
    save(menu: IUpdateMenusDTO): Promise<void>;
    delete(menu: Menu): Promise<void>;
}

export { IMenusRepository };