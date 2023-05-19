import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { AutomaticInvestmentsRepository } from "@modules/transaction/repositories/implementations/AutomaticInvestmentsRepository";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../../../../../database/index";
import { DeleteAutomaticInvestmentUseCase } from "./DeleteAutomaticInvestmentUseCase";

let connection: Connection;
let automaticInvestmentsRepository: AutomaticInvestmentsRepository;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;
let deleteAutomaticInvestmentUseCase: DeleteAutomaticInvestmentUseCase;

describe('DeleteAutomaticInvesmentUseCase', (): void => {
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
        deleteAutomaticInvestmentUseCase = new DeleteAutomaticInvestmentUseCase(automaticInvestmentsRepository);
    });

    it("should not delete a automatic investment with an invalid user_id or automatic_invesment_id", async (): Promise<void> => {
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

        await automaticInvestmentsRepository.create(automaticInvestmentData);
        const automaticInvesment = await automaticInvestmentsRepository.list(user.uuid);
        const automatic_invesment_id = automaticInvesment[0].automatic_investments_uuid;

        expect(async (): Promise<void> => { await deleteAutomaticInvestmentUseCase.execute(uuidV4(), automatic_invesment_id) })
            .rejects.toEqual(new AppError("Usuário não encontrado ou o aporte automático não pertence ao usuário informado."));
        expect(async (): Promise<void> => { await deleteAutomaticInvestmentUseCase.execute(user.uuid, uuidV4()) })
            .rejects.toEqual(new AppError("Usuário não encontrado ou o aporte automático não pertence ao usuário informado."));
    });

    it("should be able to delete a automatic investment", async (): Promise<void> => {
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

        await automaticInvestmentsRepository.create(automaticInvestmentData);
        const automaticInvesment = await automaticInvestmentsRepository.list(user.uuid);
        const automatic_invesment_id = automaticInvesment[0].automatic_investments_uuid;
        await deleteAutomaticInvestmentUseCase.execute(user.uuid, automatic_invesment_id);

        const deletedAutomaticInvesment = await automaticInvestmentsRepository.findById(user.uuid, automatic_invesment_id, true);
        expect(deletedAutomaticInvesment).toStrictEqual(undefined);
    });
})