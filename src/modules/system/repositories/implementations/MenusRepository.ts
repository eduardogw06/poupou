import { getRepository, Repository } from "typeorm";
import { Menu } from "../../entities/Menu";
import { IMenusRepository } from "../IMenusRepository";
import { ICreateMenusDTO } from "../../dtos/ICreateMenusDTO";

class MenusRepository implements IMenusRepository {
    private repository: Repository<Menu>;

    constructor() {
        this.repository = getRepository(Menu);
    }

    async create({
        name,
        url,
        icon
    }: ICreateMenusDTO): Promise<void> {
        const menu = this.repository.create({
            name,
            url,
            icon,
            admin_only: true,
            active: false
        });

        await this.repository.save(menu);
    }

    async list(activeOnly: boolean, adminOnly: boolean): Promise<Menu[]> {
        let params = {};
        if (activeOnly) params = { ...params, ...{ active: true } };
        if (!adminOnly) params = { ...params, ...{ admin_only: false } };

        return await this.repository.find(params)
    }

    async findById(id: string): Promise<Menu> {
        return await this.repository.findOne(id);
    }

    async save(category: Menu): Promise<void> {
        await this.repository.save(category)
    }

    async delete(category: Menu): Promise<void> {
        await this.repository.remove(category);
    }
}

export { MenusRepository };