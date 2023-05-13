import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUpdateUserPasswordDTO } from "../../dtos/IUpdateUserPasswordDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class UpdateUserPasswordUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }
    async execute({ user_id, oldPassword, newPassword, newPasswordConfirm }: IUpdateUserPasswordDTO): Promise<void> {
        const user = await this.usersRepository.findById(user_id)

        if (!user) throw new AppError("Usuário não encontrado.");

        const passwordMatch = await compare(oldPassword, user.password);
        if (!passwordMatch) throw new AppError("Senha atual incorreta. Revise os dados apresentados.");

        if (newPassword !== newPasswordConfirm) throw new AppError("A nova senha deve ser identica a confirmação. Revise os dados apresentados.");

        const passwordHash = await hash(newPassword, 8);
        user.password = passwordHash;

        await this.usersRepository.save(user);
    }
}

export { UpdateUserPasswordUseCase }