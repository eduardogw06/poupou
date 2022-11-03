
import { getRepository, Repository } from "typeorm";
import { ICreateCategoriesDTO } from "../../dtos/ICreateCategoriesDTO";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({
        description,
        active,
        icon
    }: ICreateCategoriesDTO): Promise<void> {
        const category = this.repository.create({
            description,
            active,
            icon
        });

        await this.repository.save(category);
    }

    async list(activeOnly: boolean): Promise<Category[]> {
        const params = activeOnly ? { active: true } : {};
        return await this.repository.find(params)
    }

    async findById(id: string): Promise<Category> {
        return await this.repository.findOne(id);
    }

    async save(category: Category): Promise<void> {
        await this.repository.save(category)
    }

    async delete(category: Category): Promise<void> {
        await this.repository.remove(category);
    }
}

export { CategoriesRepository };
