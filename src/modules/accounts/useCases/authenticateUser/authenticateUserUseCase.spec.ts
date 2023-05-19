import { Connection } from "typeorm";
import createConnection from "../../../../database/index";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { v4 as uuidV4 } from "uuid";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";
import { AppError } from "@errors/AppError";

let connection: Connection;
let usersRepository: UsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('AuthenticateUserUseCase', (): void => {
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
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    });

    it('should not authenticate with auth basic when user is a google user', async (): Promise<void> => {
        const createdUser = await usersRepository.create({
            name: "Name",
            email: "example@example.com",
            password: "",
            photo: "",
            google_id: uuidV4(),
            is_admin: false,
            dark_theme: true
        });

        expect(async (): Promise<void> => {
            await authenticateUserUseCase.execute({
                email: createdUser.email,
                password: "abcd1234"
            });
        })
            .rejects.toEqual(new AppError("Para acessar sua conta, faça seu login com o Google."));
    });

    it("shout not authenticate with invalid credentials", async (): Promise<void> => {
        expect(async (): Promise<void> => {
            await authenticateUserUseCase.execute({
                email: process.env.ADMIN_EMAIL,
                password: "sgddsgwdgsdgs"
            });
        })
            .rejects.toEqual(new AppError("E-mail ou senha incorretos!"));

        expect(async (): Promise<void> => {
            await authenticateUserUseCase.execute({
                email: 'teste@test.com',
                password: "sgddsgwdgsdgs"
            });
        })
            .rejects.toEqual(new AppError("E-mail ou senha incorretos!"));
    });

    it("shout be able to authenticate", async (): Promise<void> => {
        const userData = await authenticateUserUseCase.execute({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        });

        expect(userData).toHaveProperty('token');
        expect(userData).toHaveProperty('user');
        expect(userData.user.email).toEqual(process.env.ADMIN_EMAIL);
    });
});