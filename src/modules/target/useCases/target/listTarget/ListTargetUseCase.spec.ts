import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { TargetsRepository } from "../../../repositories/implementations/TargetsRepository";
import { ListTargetUseCase } from "./ListTargetUseCase";

describe("ListTargetUseCase", (): void => {
    let listTargetUseCase: ListTargetUseCase;
    let targetsRepository: TargetsRepository;
    let usersRepository: UsersRepository;
    let categoriesRepository: CategoriesRepository;
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
        categoriesRepository = new CategoriesRepository();
        listTargetUseCase = new ListTargetUseCase(targetsRepository);
    });

    it("should return a list of targets when target_id is not provided", async () => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const categories = await categoriesRepository.list(true);

        const target1 = {
            description: 'Target 1',
            category_id: categories[0].uuid,
            user_id: user.uuid,
            target_amount: 100,
            date_begin: new Date().toString(),
            date_end: new Date().toString(),
        };

        const target2 = {
            description: 'Target 2',
            category_id: categories[1].uuid,
            user_id: user.uuid,
            target_amount: 200,
            date_begin: '2022-01-01',
            date_end: '2022-12-31',
        };

        await targetsRepository.create(target1);
        await targetsRepository.create(target2);

        const result = await listTargetUseCase.execute({ user_id: user.uuid });
        expect(result).toHaveLength(2);
    });

    it("should return a list with a single target when target_id is provided and it matches the user_id", async () => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const targets = await listTargetUseCase.execute({ user_id: user.uuid });

        const result = await listTargetUseCase.execute({ user_id: user.uuid, target_id: targets[0].uuid });

        expect(result).toHaveLength(1);
    });
});