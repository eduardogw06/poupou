import { inject, injectable } from "tsyringe";
import { ICreateCategoriesDTO } from "../../dtos/ICreateCategoriesDTO";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: CategoriesRepository
    ) { }
    async execute({ description, active, icon }: ICreateCategoriesDTO): Promise<void> {
        await this.categoriesRepository.create({ description, active, icon });
    }
}

export { CreateCategoryUseCase }