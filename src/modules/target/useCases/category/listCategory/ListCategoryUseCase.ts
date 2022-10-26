import { inject, injectable } from "tsyringe";
import { ICategoryResponseDTO } from "../../../dtos/ICategoryResponseDTO";
import { Category } from "../../../entities/Category";
import { CategoryMap } from "../../../mapper/CategoryMap";
import { CategoriesRepository } from "../../../repositories/implementations/CategoriesRepository";

@injectable()
class ListCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository
    ) { }
    async execute(activeOnly: boolean = false): Promise<ICategoryResponseDTO[]> {
        const categories = await this.categoriesRepository.list(activeOnly);

        return categories.map((category: Category): ICategoryResponseDTO => CategoryMap.toDTO(category));
    }
}

export { ListCategoryUseCase };
