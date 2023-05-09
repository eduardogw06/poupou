import { inject, injectable } from "tsyringe";
import { IEmailResponseDTO } from "../../../dtos/IEmailResponseDTO";
import { Email } from "../../../entities/Email";
import { EmailMap } from "../../../mapper/MailMap";
import { EmailsRepository } from "../../../repositories/implementations/EmailsRepository";


interface IRequest {
    email_id?: string;
}

@injectable()
class ListMailUseCase {
    constructor(
        @inject("EmailsRepository")
        private emailsRepository: EmailsRepository
    ) { }
    async execute({ email_id }: IRequest): Promise<IEmailResponseDTO[]> {
        let emails = [];

        if (email_id) {
            const email = await this.emailsRepository.findById(email_id);
            emails.push(email);
        } else {
            emails = await this.emailsRepository.list();
        }



        return emails.map((email: Email): IEmailResponseDTO => EmailMap.toDTO(email));
    }
}

export { ListMailUseCase };
