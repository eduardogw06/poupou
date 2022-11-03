import { ICreateCategoriesDTO } from "../dtos/ICreateCategoriesDTO";
import { Category } from "../entities/Category";

interface ICategoriesRepository {
    create(data: ICreateCategoriesDTO): Promise<void>;
    list(activeOnly: boolean): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    save(category: Category): Promise<void>;
    delete(category: Category): Promise<void>;
}

export { ICategoriesRepository };
