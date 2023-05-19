import { Connection } from "typeorm";
import createConnection from "../../../../database/index";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { v4 as uuidV4 } from "uuid";
import { AppError } from "@errors/AppError";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

let connection: Connection;
let usersRepository: UsersRepository;
let updateUserUseCase: UpdateUserUseCase;

describe('UpdateUserUseCase', (): void => {
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
        updateUserUseCase = new UpdateUserUseCase(usersRepository);
    });

    it('should not update an user with invalid user_id', async (): Promise<void> => {
        expect(async (): Promise<void> => {
            await updateUserUseCase.execute({
                user_id: uuidV4(),
                name: "Name",
                email: process.env.ADMIN_EMAIL,
                dark_theme: true
            });
        })
            .rejects.toEqual(new AppError("Sessão expirada. Realize seu login novamente."));
    });

    it('should not update an user with invalid email', async (): Promise<void> => {
        expect(async (): Promise<void> => {
            const newUserData = {
                name: "Name",
                email: "test@test.com",
                password: "abcd1234",
                photo: "",
                google_id: null,
                is_admin: false,
                dark_theme: true
            }
            const newUser = await usersRepository.create(newUserData);

            await updateUserUseCase.execute({
                user_id: newUser.uuid,
                name: "Name",
                email: process.env.ADMIN_EMAIL,
                dark_theme: true
            });
        })
            .rejects.toEqual(new AppError("O usuário já existe no sistema. Tente novamente com um novo e-mail."));

    });

    it('should be able to update an user', async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        await updateUserUseCase.execute({
            user_id: user.uuid,
            name: "Updated name",
            email: process.env.ADMIN_EMAIL,
            dark_theme: true
        });

        const updatedTransaction = await usersRepository.findById(user.uuid);
        expect(updatedTransaction.name).toEqual("Updated name");
    });
});