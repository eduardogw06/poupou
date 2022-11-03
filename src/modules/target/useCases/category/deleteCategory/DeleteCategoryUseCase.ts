import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "../../../repositories/implementations/CategoriesRepository";

@injectable()
class DeleteCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository
    ) { }
    async execute(category_id: string): Promise<void> {
        const category = await this.categoriesRepository.findById(category_id);

        await this.categoriesRepository.delete(category);
    }
}

export { DeleteCategoryUseCase }