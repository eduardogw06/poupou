import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

describe("ListCategoryUseCase", (): void => {
    let categoriesRepository: CategoriesRepository;
    let listCategoryUseCase: ListCategoryUseCase
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
        listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);
    });

    it("should return a list of categories", async (): Promise<void> => {

        const categories = await categoriesRepository.list(true);

        const result = await listCategoryUseCase.execute();
        expect(result).toHaveLength(categories.length);
    });
});