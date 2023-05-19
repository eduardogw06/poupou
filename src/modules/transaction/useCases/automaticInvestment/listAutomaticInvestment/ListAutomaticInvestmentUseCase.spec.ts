import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { AutomaticInvestmentsRepository } from "@modules/transaction/repositories/implementations/AutomaticInvestmentsRepository";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../../../../../database/index";
import { ListAutomaticInvestmentUseCase } from "./ListAutomaticInvestmentUseCase";

let connection: Connection;
let automaticInvestmentsRepository: AutomaticInvestmentsRepository;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;
let listAutomaticInvestmentUseCase: ListAutomaticInvestmentUseCase;

describe('ListAutomaticInvesmentUseCase', (): void => {
    beforeAll(async (): Promise<void> => {
        connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async (): Promise<void> => {
        await connection.dropDatabase();
        await connection.close();
    });

    beforeEach((): void => {
        automaticInvestmentsRepository = new AutomaticInvestmentsRepository();
        usersRepository = new UsersRepository();
        categoriesRepository = new CategoriesRepository();
        targetsRepository = new TargetsRepository();
        listAutomaticInvestmentUseCase = new ListAutomaticInvestmentUseCase(automaticInvestmentsRepository);
    });

    it("should be able to list automatic investment", async (): Promise<void> => {
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

        await targetsRepository.create(targetData);

        const target = await targetsRepository.list(user.uuid);

        const automaticInvestment1 = {
            user_id: user.uuid,
            target_id: target[0].targets_uuid,
            amount: 10,
            day: 5
        };

        const automaticInvestment2 = {
            user_id: user.uuid,
            target_id: target[0].targets_uuid,
            amount: 15,
            day: 15
        };

        await automaticInvestmentsRepository.create(automaticInvestment1);
        await automaticInvestmentsRepository.create(automaticInvestment2);

        const transactions = await listAutomaticInvestmentUseCase.execute(user.uuid);
        expect(transactions).toHaveLength(2);
    });
})