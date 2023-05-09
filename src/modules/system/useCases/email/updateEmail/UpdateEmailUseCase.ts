import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../errors/AppError";
import { UsersRepository } from "../../../../accounts/repositories/implementations/UsersRepository";
import { IUpdateEmailsDTO } from "../../../dtos/IUpdateEmailDTO";
import { EmailsRepository } from "../../../repositories/implementations/EmailsRepository";

@injectable()
class UpdateMailUseCase {
    constructor(
        @inject("EmailsRepository")
        private emailsRepository: EmailsRepository
    ) { }
    async execute({ user_id, email_id, description, warning, subject, content, active }: IUpdateEmailsDTO): Promise<void> {
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (user) {
            if (!user.is_admin) throw new AppError('Não autorizado', 403);
            const email = await this.emailsRepository.findById(email_id);

            email.description = description ?? email.description;
            email.warning = warning ?? email.warning;
            email.subject = subject ?? email.subject;
            email.content = content ?? email.content;
            email.active = active ?? email.active;

            await this.emailsRepository.save(email);
        }
    }
}

export { UpdateMailUseCase };
