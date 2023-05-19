import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { TransactionsRepository } from "@modules/transaction/repositories/implementations/TransactionsRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { ICreateTransactionDTO } from "@modules/transaction/dtos/ICreateTransactionDTO";
import { UpdateTransactionUseCase } from "./UpdateTransactionUseCase";
import { v4 as uuidV4 } from "uuid";
import { AppError } from "@errors/AppError";

let connection: Connection;
let transactionsRepository: TransactionsRepository;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;
let updateTransactionUseCase: UpdateTransactionUseCase;

describe('UpdateTransactionUseCase', (): void => {
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
        updateTransactionUseCase = new UpdateTransactionUseCase(transactionsRepository);
    });

    it("should be able to update a transaction", async (): Promise<void> => {
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

        await transactionsRepository.create(transactionData);

        const transactions = await transactionsRepository.list(user.uuid);
        const transaction_id = transactions[0].transactions_uuid;

        const transaction = await transactionsRepository.findById(user.uuid, transaction_id, true);
        await updateTransactionUseCase.execute({
            user_id: user.uuid,
            transaction_id: transaction.uuid,
            target_id: transaction.target_id,
            type_id: transaction.type_id,
            amount: 25,
            date: transaction.date
        });

        const updatedTransaction = await transactionsRepository.findById(user.uuid, transaction_id, true);
        expect(updatedTransaction.amount).toEqual("25");
    });

    it("should not update a transaction with invalid user_id", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const transactions = await transactionsRepository.list(user.uuid);
        const transaction_id = transactions[0].transactions_uuid;
        const transaction = await transactionsRepository.findById(user.uuid, transaction_id, true);

        expect(async (): Promise<void> => {
            await updateTransactionUseCase.execute({
                user_id: uuidV4(),
                transaction_id: transaction.uuid,
                target_id: transaction.target_id,
                type_id: transaction.type_id,
                amount: 25,
                date: transaction.date
            });
        })
            .rejects.toEqual(new AppError("Usuário não encontrado ou aporte não pertence ao usuário informado."));
    });

    it("should not update transaction with invalid target_id", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const transactions = await transactionsRepository.list(user.uuid);
        const transaction_id = transactions[0].transactions_uuid;
        const transaction = await transactionsRepository.findById(user.uuid, transaction_id, true);

        expect(async (): Promise<void> => {
            await updateTransactionUseCase.execute({
                user_id: user.uuid,
                transaction_id: transaction.uuid,
                target_id: uuidV4(),
                type_id: transaction.type_id,
                amount: 10,
                date: transaction.date
            });
        })
            .rejects.toEqual(new AppError("Selecione o objetivo a ser investido."));
    });

    it("should not update a transaction with invalid amount", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const transactions = await transactionsRepository.list(user.uuid);
        const transaction_id = transactions[0].transactions_uuid;
        const transaction = await transactionsRepository.findById(user.uuid, transaction_id, true);

        expect(async (): Promise<void> => {
            await updateTransactionUseCase.execute({
                user_id: user.uuid,
                transaction_id: transaction.uuid,
                target_id: transaction.target_id,
                type_id: transaction.type_id,
                amount: 5,
                date: transaction.date
            });
        })
            .rejects.toEqual(new AppError("O valor mínimo para um aporte é de R$ 10,00."));
    });
})