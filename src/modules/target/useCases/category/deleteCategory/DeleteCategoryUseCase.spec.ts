import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CreateTargetUseCase } from "../../target/createTarget/CreateTargetUseCase";
import { AppError } from "@errors/AppError";

describe("DeleteCategoryUseCase", (): void => {
    let categoriesRepository: CategoriesRepository;
    let createCategoryUseCase: CreateCategoryUseCase;
    let deleteCategoryUseCase: DeleteCategoryUseCase;
    let targetsRepository: TargetsRepository;
    let createTargetUseCase: CreateTargetUseCase;
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
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
        deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);
        targetsRepository = new TargetsRepository();
        createTargetUseCase = new CreateTargetUseCase(targetsRepository);
    });

    it("should delete category", async (): Promise<void> => {
        const newCategory = {
            description: "New category",
            active: true,
            icon: 'heart'
        };

        await createCategoryUseCase.execute(newCategory);

        const categories = await categoriesRepository.list(true);
        const lastCategoryRegistered = categories.slice(-1)[0];

        await deleteCategoryUseCase.execute(lastCategoryRegistered.uuid);

        const deletedTarget = await categoriesRepository.findById(lastCategoryRegistered.uuid);
        expect(deletedTarget).toStrictEqual(undefined);
    });

    it("should not delete category linked to one or more targets", async (): Promise<void> => {
        const newCategory = {
            description: "New category",
            active: true,
            icon: 'heart'
        };

        await createCategoryUseCase.execute(newCategory);

        const categories = await categoriesRepository.list(true);
        const lastCategoryRegistered = categories.slice(-1)[0];

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);

        const targetData = {
            description: 'My target description',
            category_id: lastCategoryRegistered.uuid,
            user_id: user.uuid,
            target_amount: 100,
            date_begin: new Date().toString(),
            date_end: new Date().toString(),
        };

        await createTargetUseCase.execute(targetData);


        expect(async (): Promise<void> => { await deleteCategoryUseCase.execute(lastCategoryRegistered.uuid) })
            .rejects.toEqual(new AppError('Não é possível excluir uma categoria já vinculada a um ou mais objetivo(s).'));

    })
});