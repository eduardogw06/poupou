import { ICreateMenusDTO } from "../dtos/ICreateMenusDTO";
import { IUpdateMenusDTO } from "../dtos/IUpdateMenuDTO";
import { Menu } from "../entities/Menu";

interface IMenusRepository {
    create(data: ICreateMenusDTO): Promise<void>;
    list(activeOnly: boolean, adminOnly: boolean): Promise<Menu[]>;
    findById(user_id: string, id: string, onlyTransaction: boolean): Promise<Menu>;
    save(target: IUpdateMenusDTO): Promise<void>;
    delete(target: Menu): Promise<void>;
}

export { IMenusRepository };