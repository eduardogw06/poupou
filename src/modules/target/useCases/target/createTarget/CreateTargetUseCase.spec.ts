import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { CreateTargetUseCase } from "./CreateTargetUseCase";

let createTargetUseCase: CreateTargetUseCase;
let targetsRepository: TargetsRepository;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let connection: Connection;

describe('CreateTargetUseCase', (): void => {
    beforeAll(async (): Promise<void> => {
        connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async (): Promise<void> => {
        await connection.dropDatabase();
        await connection.close();
    });

    beforeEach((): void => {
        targetsRepository = new TargetsRepository();
        createTargetUseCase = new CreateTargetUseCase(targetsRepository);
        categoriesRepository = new CategoriesRepository();
        usersRepository = new UsersRepository();
    });

    it('should be able to create a new target', async () => {
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

        const targets = await targetsRepository.list(user.uuid);

        expect(targets).toHaveLength(1);
        expect(targets[0]).toHaveProperty('targets_uuid');
        expect(targets[0].targets_description).toEqual(targetData.description);
        expect(targets[0].targets_category_id).toEqual(targetData.category_id);
        expect(targets[0].targets_user_id).toEqual(targetData.user_id);
        expect(Number(targets[0].targets_target_amount)).toEqual(targetData.target_amount);
    });
});