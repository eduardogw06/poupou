import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "../../../repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "../../../repositories/implementations/TargetsRepository";
import { AppError } from "../../../../../errors/AppError";

@injectable()
class DeleteCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository
    ) { }
    async execute(category_id: string): Promise<void> {
        const targetsRepository = new TargetsRepository();
        const targetsByCategory = await targetsRepository.findByCategory(category_id);

        if (targetsByCategory) throw new AppError("Não é possível excluir uma categoria já vinculada a um ou mais objetivo(s).");

        const category = await this.categoriesRepository.findById(category_id);
        await this.categoriesRepository.delete(category);
    }
}

export { DeleteCategoryUseCase }