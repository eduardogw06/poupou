import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { TransactionsRepository } from "@modules/transaction/repositories/implementations/TransactionsRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { ICreateTransactionDTO } from "@modules/transaction/dtos/ICreateTransactionDTO";
import { ListTransactionUseCase } from "./ListTransactionUseCase";

let connection: Connection;
let transactionsRepository: TransactionsRepository;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;
let listTransactionUseCase: ListTransactionUseCase;

describe('ListTransactionUseCase', (): void => {
    beforeAll(async (): Promise<void> => {
        connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async (): Promise<void> => {
        await connection.dropDatabase();
        await connection.close();
    });

    beforeEach((): void => {
        transactionsRepository = new TransactionsRepository();
        usersRepository = new UsersRepository();
        categoriesRepository = new CategoriesRepository();
        targetsRepository = new TargetsRepository();
        listTransactionUseCase = new ListTransactionUseCase(transactionsRepository);
    });

    it("should list transactions when target_id is not provided", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const categories = await categoriesRepository.list(true);

        const target1 = {
            description: 'My target description 1',
            category_id: categories[0].uuid,
            user_id: user.uuid,
            target_amount: 100,
            date_begin: new Date().toString(),
            date_end: new Date().toString(),
        };

        const target2 = {
            description: 'My target description 2',
            category_id: categories[0].uuid,
            user_id: user.uuid,
            target_amount: 100,
            date_begin: new Date().toString(),
            date_end: new Date().toString(),
        };

        await targetsRepository.create(target1);
        await targetsRepository.create(target2);

        const target = await targetsRepository.list(user.uuid);

        const transaction1: ICreateTransactionDTO = {
            user_id: user.uuid,
            target_id: target[0].targets_uuid,
            type: "Aporte",
            amount: 10,
            date: new Date()
        };

        const transaction2: ICreateTransactionDTO = {
            user_id: user.uuid,
            target_id: target[1].targets_uuid,
            type: "Aporte",
            amount: 25,
            date: new Date()
        };

        await transactionsRepository.create(transaction1);
        await transactionsRepository.create(transaction2);

        const transactions = await listTransactionUseCase.execute({ user_id: user.uuid });
        expect(transactions).toHaveLength(2);
    });

    it("should list transactions when target_id is provided", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const targets = await targetsRepository.list(user.uuid);

        const transactions = await listTransactionUseCase.execute({ user_id: user.uuid, target_id: targets[0].targets_uuid });
        expect(transactions).toHaveLength(1);
    });

    it("should list transactions when transaction_id is provided", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const transactions = await transactionsRepository.list(user.uuid);

        const transaction = await listTransactionUseCase.execute({ user_id: user.uuid, transaction_id: transactions[0].transactions_uuid });
        expect(transaction).toHaveLength(1);
    });

})