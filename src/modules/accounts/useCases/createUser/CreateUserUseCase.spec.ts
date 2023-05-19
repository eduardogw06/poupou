import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { Connection } from "typeorm";
import createConnection from "../../../../database/index";
import { CreateUserUseCase } from "./CreateUserUseCase";

let connection: Connection;
let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('CreateUserUseCase', (): void => {
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
        createUserUseCase = new CreateUserUseCase(usersRepository);
    });

    it('should not create a new user with an invalid email', async (): Promise<void> => {
        expect(async (): Promise<void> => {
            await createUserUseCase.execute({
                name: "Name",
                email: process.env.ADMIN_EMAIL,
                password: "abcd1234",
                photo: "",
                google_id: null,
                is_admin: false,
                dark_theme: true
            });
        })
            .rejects.toEqual(new AppError("O usuário já existe no sistema. Tente novamente com um novo e-mail."));
    });

    it("shout be able to create a new user", async (): Promise<void> => {
        const newUserData = {
            name: "Name",
            email: "test@test.com",
            password: "abcd1234",
            photo: "",
            google_id: null,
            is_admin: false,
            dark_theme: true
        }
        const newUser = await createUserUseCase.execute(newUserData);

        expect(newUser).toHaveProperty('uuid');
        expect(newUser.email).toEqual(newUserData.email);
        expect(newUser.name).toEqual(newUserData.name);
    });
});