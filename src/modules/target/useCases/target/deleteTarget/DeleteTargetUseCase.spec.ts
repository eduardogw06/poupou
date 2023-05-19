import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { CreateTargetUseCase } from "../createTarget/CreateTargetUseCase";
import { ListTargetUseCase } from "../listTarget/ListTargetUseCase";
import { DeleteTargetUseCase } from "./DeleteTargetUseCase";

describe("DeleteTargetUseCase", (): void => {
    let deleteTargetUseCase: DeleteTargetUseCase;
    let targetsRepository: TargetsRepository;
    let usersRepository: UsersRepository;
    let listTargetUseCase: ListTargetUseCase;
    let categoriesRepository: CategoriesRepository;
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
        usersRepository = new UsersRepository();
        targetsRepository = new TargetsRepository();
        createTargetUseCase = new CreateTargetUseCase(targetsRepository);
        deleteTargetUseCase = new DeleteTargetUseCase(targetsRepository);
        listTargetUseCase = new ListTargetUseCase(targetsRepository);
        categoriesRepository = new CategoriesRepository();
    });

    it("should delete target", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const categories = await categoriesRepository.list(true);

        const targetData = {
            description: 'My target description',
            category_id: categories[0].uuid,
            user_id: user.uuid,
            target_amount: 100,
            date_begin: new Date().toString(),
            date_end: new Date().toString(),
        };
        await createTargetUseCase.execute(targetData);

        const targets = await listTargetUseCase.execute({ user_id: user.uuid });
        const target_id = targets[0].uuid;
        await deleteTargetUseCase.execute(user.uuid, target_id);

        const deletedTarget = await targetsRepository.findById(user.uuid, target_id, false);
        expect(deletedTarget).toStrictEqual(undefined);
    });
});