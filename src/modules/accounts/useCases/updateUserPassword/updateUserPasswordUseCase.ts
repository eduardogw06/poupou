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
    async execute({ email, oldPassword, newPassword, newPasswordConfirm }: IUpdateUserPasswordDTO): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) throw new AppError("User not found");

        const passwordMatch = await compare(oldPassword, user.password);
        if (!passwordMatch) throw new AppError("Incorrect current password.");

        if (newPassword !== newPasswordConfirm) throw new AppError("Incorrect password confirmation");

        const passwordHash = await hash(newPassword, 8);
        user.password = passwordHash;

        await this.usersRepository.save(user);
    }
}

export { UpdateUserPasswordUseCase }