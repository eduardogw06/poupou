import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

describe("DeleteCategoryUseCase", (): void => {
    let categoriesRepository: CategoriesRepository;
    let updateCategoryUseCase: UpdateCategoryUseCase
    let connection: Connection;

    beforeAll(async (): Promise<void> => {
        connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async (): Promise<void> => {
        await connection.dropDatabase();
        await connection.close();
    });

    beforeEach((): void => {
        categoriesRepository = new CategoriesRepository();
        updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository);
    });

    it("should update target", async (): Promise<void> => {
        const categories = await categoriesRepository.list(true);
        let updatedCategory = categories[0];

        await updateCategoryUseCase.execute({
            category_id: updatedCategory.uuid,
            description: updatedCategory.description,
            active: updatedCategory.active,
            icon: 'heart'
        });


        const updatedTarget = await categoriesRepository.findById(updatedCategory.uuid);
        expect(updatedTarget.icon).toEqual("heart");
    });
});