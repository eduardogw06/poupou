import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { AutomaticInvestmentsRepository } from "@modules/transaction/repositories/implementations/AutomaticInvestmentsRepository";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../../../../../database/index";
import { UpdateAutomaticInvestmentUseCase } from "./UpdateAutomaticInvestmentUseCase";

let connection: Connection;
let automaticInvestmentsRepository: AutomaticInvestmentsRepository;
let updateAutomaticInvestmentUseCase: UpdateAutomaticInvestmentUseCase;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;

describe('UpdateAutomaticInvesmentUseCase', (): void => {
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
        updateAutomaticInvestmentUseCase = new UpdateAutomaticInvestmentUseCase(automaticInvestmentsRepository);
    });

    it("should not update an automatic investment with an invalid user_id or an invalid automatic_investment_id", async (): Promise<void> => {
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

        const automaticInvestments = await automaticInvestmentsRepository.list(user.uuid);
        const automaticInvestmentId = automaticInvestments[0].automatic_investments_uuid;
        const automaticInvestment = await automaticInvestmentsRepository.findById(user.uuid, automaticInvestmentId, true);

        expect(async (): Promise<void> => {
            await updateAutomaticInvestmentUseCase.execute({
                user_id: uuidV4(),
                automatic_investment_id: automaticInvestment.uuid,
                target_id: automaticInvestment.target_id,
                amount: automaticInvestment.amount,
                day: automaticInvestment.day,
                active: automaticInvestment.active
            });
        })
            .rejects.toEqual(new AppError("Usuário não encontrado ou aporte automático não pertence ao usuário informado."));
        expect(async (): Promise<void> => {
            await updateAutomaticInvestmentUseCase.execute({
                user_id: user.uuid,
                automatic_investment_id: uuidV4(),
                target_id: automaticInvestment.target_id,
                amount: automaticInvestment.amount,
                day: automaticInvestment.day,
                active: automaticInvestment.active
            });
        })
            .rejects.toEqual(new AppError("Usuário não encontrado ou aporte automático não pertence ao usuário informado."));
    });

    it("should not update an automatic investment with an invalid amount", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const automaticInvestments = await automaticInvestmentsRepository.list(user.uuid);
        const automaticInvestmentId = automaticInvestments[0].automatic_investments_uuid;
        const automaticInvestment = await automaticInvestmentsRepository.findById(user.uuid, automaticInvestmentId, true);

        expect(async (): Promise<void> => {
            await updateAutomaticInvestmentUseCase.execute({
                user_id: user.uuid,
                automatic_investment_id: automaticInvestment.uuid,
                target_id: automaticInvestment.target_id,
                amount: 5,
                day: automaticInvestment.day,
                active: automaticInvestment.active
            });
        })
            .rejects.toEqual(new AppError("O valor mínimo para um aporte é de R$ 10,00."));
    });

    it("should not create an automatic investment with an invalid target_id", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const automaticInvestments = await automaticInvestmentsRepository.list(user.uuid);
        const automaticInvestmentId = automaticInvestments[0].automatic_investments_uuid;
        const automaticInvestment = await automaticInvestmentsRepository.findById(user.uuid, automaticInvestmentId, true);

        expect(async (): Promise<void> => {
            await updateAutomaticInvestmentUseCase.execute({
                user_id: user.uuid,
                automatic_investment_id: automaticInvestment.uuid,
                target_id: uuidV4(),
                amount: automaticInvestment.amount,
                day: automaticInvestment.day,
                active: automaticInvestment.active
            });
        })
            .rejects.toEqual(new AppError("Selecione o objetivo a ser investido."));
    });

    it("should be able to update an automatic investment", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const automaticInvestments = await automaticInvestmentsRepository.list(user.uuid);
        const automaticInvestmentId = automaticInvestments[0].automatic_investments_uuid;
        const automaticInvestment = await automaticInvestmentsRepository.findById(user.uuid, automaticInvestmentId, true);

        await updateAutomaticInvestmentUseCase.execute({
            user_id: user.uuid,
            automatic_investment_id: automaticInvestment.uuid,
            target_id: automaticInvestment.target_id,
            amount: 50,
            day: automaticInvestment.day,
            active: automaticInvestment.active
        });

        const updatedTransaction = await automaticInvestmentsRepository.findById(user.uuid, automaticInvestmentId, true);
        expect(updatedTransaction.amount).toEqual("50");
    });
})