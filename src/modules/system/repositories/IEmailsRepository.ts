import { Email } from "../entities/Email";

interface IEmailsRepository {
    list(): Promise<Email[]>;
    findById(id: string): Promise<Email>
    save(email: Email): Promise<void>
}

export { IEmailsRepository }