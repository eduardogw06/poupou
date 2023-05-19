import { Connection } from "typeorm";
import createConnection from "../../../../database/index";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";
import { v4 as uuidV4 } from "uuid";
import { AppError } from "@errors/AppError";
import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";
import { AuthenticateUserUseCase } from "../authenticateUser/authenticateUserUseCase";

let connection: Connection;
let usersRepository: UsersRepository;
let updateUserPasswordUseCase: UpdateUserPasswordUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('UpdateUserPasswordUseCase', (): void => {
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
        updateUserPasswordUseCase = new UpdateUserPasswordUseCase(usersRepository);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    });

    it('should not update an user password with invalid user_id', async (): Promise<void> => {
        expect(async (): Promise<void> => {
            await updateUserPasswordUseCase.execute({
                user_id: uuidV4(),
                oldPassword: 'randompassword',
                newPassword: 'abcd1234',
                newPasswordConfirm: 'abcd1234'
            });
        })
            .rejects.toEqual(new AppError("Usuário não encontrado."));
    });

    it('should not update an user password with invalid old_password', async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);

        expect(async (): Promise<void> => {
            await updateUserPasswordUseCase.execute({
                user_id: user.uuid,
                oldPassword: 'randompassword',
                newPassword: 'abcd1234',
                newPasswordConfirm: 'abcd1234'
            });
        })
            .rejects.toEqual(new AppError("Senha atual incorreta. Revise os dados apresentados."));
    });

    it('should not update an user password with new password and password confirmation conflict', async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);

        expect(async (): Promise<void> => {
            await updateUserPasswordUseCase.execute({
                user_id: user.uuid,
                oldPassword: process.env.ADMIN_PASSWORD,
                newPassword: 'abcd1234',
                newPasswordConfirm: 'abc123'
            });
        })
            .rejects.toEqual(new AppError("A nova senha deve ser identica a confirmação. Revise os dados apresentados."));
    });

    it('should be able to update an user password', async (): Promise<void> => {
        const user = await usersRepository.findByEmail(process.env.ADMIN_EMAIL);
        const newPassword = {
            user_id: user.uuid,
            oldPassword: process.env.ADMIN_PASSWORD,
            newPassword: 'test1234',
            newPasswordConfirm: 'test1234'
        };
        await updateUserPasswordUseCase.execute(newPassword);

        const userData = await authenticateUserUseCase.execute({
            email: process.env.ADMIN_EMAIL,
            password: newPassword.newPassword
        });

        expect(userData).toHaveProperty('token');
        expect(userData).toHaveProperty('user');
        expect(userData.user.email).toEqual(process.env.ADMIN_EMAIL);
    });
});