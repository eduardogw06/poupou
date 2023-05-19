import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { ICreateTransactionDTO } from "@modules/transaction/dtos/ICreateTransactionDTO";
import { TransactionsRepository } from "@modules/transaction/repositories/implementations/TransactionsRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;
let transactionsRepository: TransactionsRepository;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;
let createTransactionsUseCase: CreateTransactionUseCase;

describe('CreateTransactionUseCase', (): void => {
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
        createTransactionsUseCase = new CreateTransactionUseCase(transactionsRepository);
    });

    it("should be able to create a new transaction", async (): Promise<void> => {
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

        const transactionData: ICreateTransactionDTO = {
            user_id: user.uuid,
            target_id: target[0].targets_uuid,
            type: "Aporte",
            amount: 10,
            date: new Date()
        };

        await createTransactionsUseCase.execute(transactionData);

        const transactions = await transactionsRepository.list(user.uuid);

        expect(transactions).toHaveLength(1);
        expect(transactions[0]).toHaveProperty('transactions_uuid');
        expect(Number(transactions[0].transactions_amount)).toEqual(transactionData.amount);
        expect(transactions[0].transactions_target_id).toEqual(transactionData.target_id);
    });

    it("should not create a new transaction with invalid user_id", async (): Promise<void> => {
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

        const transactionData: ICreateTransactionDTO = {
            user_id: uuidV4(),
            target_id: target[0].targets_uuid,
            type: "Aporte",
            amount: 5,
            date: new Date()
        };

        expect(async (): Promise<void> => { await createTransactionsUseCase.execute(transactionData) })
            .rejects.toEqual(new AppError("Usuário não encontrado."));
    });

    it("should not create a new transaction with invalid amount", async (): Promise<void> => {
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

        const transactionData: ICreateTransactionDTO = {
            user_id: user.uuid,
            target_id: target[0].targets_uuid,
            type: "Aporte",
            amount: 5,
            date: new Date()
        };

        expect(async (): Promise<void> => { await createTransactionsUseCase.execute(transactionData) })
            .rejects.toEqual(new AppError("O valor mínimo para um aporte é de R$ 10,00."));
    });

    it("should not create a new transaction with invalid target_id", async (): Promise<void> => {
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

        const transactionData: ICreateTransactionDTO = {
            user_id: user.uuid,
            target_id: uuidV4(),
            type: "Aporte",
            amount: 10,
            date: new Date()
        };

        expect(async (): Promise<void> => { await createTransactionsUseCase.execute(transactionData) })
            .rejects.toEqual(new AppError("Selecione o objetivo a ser investido."));
    });

})