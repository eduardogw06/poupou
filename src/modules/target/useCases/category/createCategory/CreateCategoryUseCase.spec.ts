import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let categoriesRepository: CategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase
let connection: Connection;

describe('CreateCategoryUseCase', (): void => {
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
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    });

    it('should be able to create a new category', async (): Promise<void> => {
        const categoriesLength = (await categoriesRepository.list(true)).length;
        const newCategory = {
            description: "New category",
            active: true,
            icon: 'heart'
        };

        await createCategoryUseCase.execute(newCategory);

        const categories = await categoriesRepository.list(true);
        const lastCategoryRegistered = categories.slice(-1)[0];

        expect(categories).toHaveLength(categoriesLength + 1);
        expect(lastCategoryRegistered).toHaveProperty('uuid');
        expect(lastCategoryRegistered.description).toEqual(newCategory.description);
        expect(lastCategoryRegistered.active).toEqual(newCategory.active);
        expect(lastCategoryRegistered.icon).toEqual(newCategory.icon);
    });
});