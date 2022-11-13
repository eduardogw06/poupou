import { compare } from "bcrypt";
import { inject, injectable, singleton } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const { SECRET_TOKEN } = process.env;

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail ou senha incorretos!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("E-mail ou senha incorretos!");
        }

        const token = sign({}, SECRET_TOKEN, {
            subject: user.uuid,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
