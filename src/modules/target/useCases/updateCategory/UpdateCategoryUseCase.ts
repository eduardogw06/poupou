import { inject, injectable } from "tsyringe";
import { IUpdateCategoryDTO } from "../../dtos/IUpdateCategoryDTO";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

@injectable()
class UpdateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository
    ) { }
    async execute({ category_id, description, active, icon }: IUpdateCategoryDTO): Promise<void> {
        const category = await this.categoriesRepository.findById(category_id);

        category.description = description ?? category.description;
        category.active = active ?? category.active;
        category.icon = icon ?? category.icon;

        await this.categoriesRepository.save(category);
    }
}

export { UpdateCategoryUseCase };
