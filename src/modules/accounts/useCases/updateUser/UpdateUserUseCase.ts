import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }
    async execute({ user_id, name, email, dark_theme }: IUpdateUserDTO): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) throw new AppError("Sessão expirada. Realize seu login novamente.");

        const userByEmail = await this.usersRepository.findByEmail(email);
        if (userByEmail && email === userByEmail.email && userByEmail.uuid !== user_id)
            throw new AppError("O usuário já existe no sistema. Tente novamente com um novo e-mail.");

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.dark_theme = dark_theme ?? user.dark_theme;

        await this.usersRepository.save(user);
    }
}

export { UpdateUserUseCase }