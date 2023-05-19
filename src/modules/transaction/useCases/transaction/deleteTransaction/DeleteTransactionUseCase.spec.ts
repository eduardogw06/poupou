import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { CategoriesRepository } from "@modules/target/repositories/implementations/CategoriesRepository";
import { TargetsRepository } from "@modules/target/repositories/implementations/TargetsRepository";
import { ICreateTransactionDTO } from "@modules/transaction/dtos/ICreateTransactionDTO";
import { TransactionsRepository } from "@modules/transaction/repositories/implementations/TransactionsRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../../database/index";
import { DeleteTransactionUseCase } from "./DeleteTransactionUseCase";
import { v4 as uuidV4 } from "uuid";
import { AppError } from "@errors/AppError";

let connection: Connection;
let transactionsRepository: TransactionsRepository;
let usersRepository: UsersRepository;
let categoriesRepository: CategoriesRepository;
let targetsRepository: TargetsRepository;
let deleteTransactionUseCase: DeleteTransactionUseCase;

describe('DeleteTransactionUseCase', (): void => {
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
        deleteTransactionUseCase = new DeleteTransactionUseCase(transactionsRepository)
    });


    it("should not delete transaction with invalid user_id", async (): Promise<void> => {
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

        const transaction = await transactionsRepository.list(user.uuid);
        const transaction_id = transaction[0].transactions_uuid;

        expect(async (): Promise<void> => { await deleteTransactionUseCase.execute(uuidV4(), transaction_id) })
            .rejects.toEqual(new AppError("Usuário não encontrado ou o aporte não pertence ao usuário informado."));
    });


    it("should delete transaction", async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);

        const transaction = await transactionsRepository.list(user.uuid);
        const transaction_id = transaction[0].transactions_uuid;

        await deleteTransactionUseCase.execute(user.uuid, transaction_id);

        const deletedTransaction = await transactionsRepository.findById(user.uuid, transaction_id, false);
        expect(deletedTransaction).toStrictEqual(undefined);
    });
})