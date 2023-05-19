import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { Target } from "@modules/target/entities/Target";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { CreateTargetUseCase } from "../createTarget/CreateTargetUseCase";
import { ListTargetUseCase } from "../listTarget/ListTargetUseCase";
import { UpdateTargetUseCase } from "./UpdateTargetUseCase";

describe("DeleteTargetUseCase", (): void => {
    let updateTargetUseCase: UpdateTargetUseCase;
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
        updateTargetUseCase = new UpdateTargetUseCase(targetsRepository);
        listTargetUseCase = new ListTargetUseCase(targetsRepository);
        categoriesRepository = new CategoriesRepository();
    });

    it("should update target", async (): Promise<void> => {
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

        const target = await targetsRepository.findById(user.uuid, target_id, true) as Target;
        await updateTargetUseCase.execute({
            target_id: target.uuid,
            description: target.description,
            category_id: target.category_id,
            user_id: target.user_id,
            target_amount: 200,
            date_begin: target.date_begin,
            date_end: target.date_end
        });

        const updatedTarget = await targetsRepository.findById(user.uuid, target_id, true) as Target;
        expect(updatedTarget.target_amount).toEqual("200");
    });
});