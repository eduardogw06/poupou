import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { AutomaticInvestmentsRepository } from "@modules/transaction/repositories/implementations/AutomaticInvestmentsRepository";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../../../../../database/index";
import { CreateAutomaticInvestmentUseCase } from "./CreateAutomaticInvestmentUseCase";

let connection: Connection;
let automaticInvestmentsRepository: AutomaticInvestmentsRepository;
let createAutomaticInvestmentUseCase: CreateAutomaticInvestmentUseCase;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;

describe('CreateAutomaticInvesmentUseCase', (): void => {
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
        createAutomaticInvestmentUseCase = new CreateAutomaticInvestmentUseCase(automaticInvestmentsRepository);
    });

    it("should not create a new automatic investment with an invalid user_id", async (): Promise<void> => {
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

        const automaticInvestmentData = {
            user_id: uuidV4(),
            target_id: target[0].targets_uuid,
            amount: 10,
            day: 5
        };

        expect(async (): Promise<void> => { await createAutomaticInvestmentUseCase.execute(automaticInvestmentData); })
            .rejects.toEqual(new AppError("Usuário não encontrado."));
    });

    it("should not create a new automatic investment with an invalid amount", async (): Promise<void> => {
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

        const automaticInvestmentData = {
            user_id: user.uuid,
            target_id: target[0].targets_uuid,
            amount: 5,
            day: 5
        };

        expect(async (): Promise<void> => { await createAutomaticInvestmentUseCase.execute(automaticInvestmentData); })
            .rejects.toEqual(new AppError("O valor mínimo para um aporte é de R$ 10,00."));
    });

    it("should not create a new automatic investment with an invalid target_id", async (): Promise<void> => {
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

        const automaticInvestmentData = {
            user_id: user.uuid,
            target_id: uuidV4(),
            amount: 10,
            day: 5
        };

        expect(async (): Promise<void> => { await createAutomaticInvestmentUseCase.execute(automaticInvestmentData); })
            .rejects.toEqual(new AppError("Selecione o objetivo a ser investido."));
    });

    it("should be able to create a new automatic investment", async (): Promise<void> => {
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

        const automaticInvestmentData = {
            user_id: user.uuid,
            target_id: target[0].targets_uuid,
            amount: 10,
            day: 5
        };

        await createAutomaticInvestmentUseCase.execute(automaticInvestmentData);

        const automaticInvestment = await automaticInvestmentsRepository.list(user.uuid);

        expect(automaticInvestment).toHaveLength(1);
        expect(automaticInvestment[0]).toHaveProperty('automatic_investments_uuid');
        expect(Number(automaticInvestment[0].automatic_investments_amount)).toEqual(automaticInvestmentData.amount);
        expect(automaticInvestment[0].automatic_investments_day).toEqual(automaticInvestmentData.day);
    });
})