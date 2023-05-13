import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IUpdateUserPasswordDTO } from "../../dtos/IUpdateUserPasswordDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { getRandomPassword } from "../../../../utils/getRandomPassword";
import { EmailsRepository } from "../../../system/repositories/implementations/EmailsRepository";
import { sendMail } from "../../../../utils/sendMail";

@injectable()
class PasswordRecoveryUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) { }
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) throw new AppError("Usuário não encontrado.");
        const randomPassword = getRandomPassword(8);

        if (user.google_id) throw new AppError("Seu cadastro está vinculado a uma conta Google. Tente realizar seu acesso por este método.");

        const threeHours = 3 * 60 * 60 * 1000;
        if (user.password_changed && user.password_changed < new Date(new Date().getTime() + threeHours))
            throw new AppError("Você tentou recuperar sua senha recentemente e um email com a nova senha foi encaminhado para seu email. Verifique sua caixa de entrada e, caso o email não tenha chego, tente novamente daqui a algumas horas.");

        const passwordHash = await hash(randomPassword, 8);
        user.password = passwordHash;
        user.password_changed = new Date();

        await this.usersRepository.save(user);

        const emailsRepository = new EmailsRepository();
        const passwordRecoveryEmail = await emailsRepository.findById(process.env.PASSWORD_RECOVERY_EMAIL);

        if (passwordRecoveryEmail && user) {

            sendMail({
                to: user.email,
                from: process.env.FROM_EMAIL,
                subject: passwordRecoveryEmail.subject,
                content: passwordRecoveryEmail.content
                    .replace('[name]', user.name)
                    .replace('[password_recovery]', randomPassword)
            });
        }
    }
}

export { PasswordRecoveryUseCase }