import { Repository, getRepository } from "typeorm";
import { IEmailsRepository } from "../IEmailsRepository";
import { Email } from "../../entities/Email";

class EmailsRepository implements IEmailsRepository {
    private repository: Repository<Email>;

    constructor() {
        this.repository = getRepository(Email);
    }

    async list(): Promise<Email[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<Email> {
        return await this.repository.findOne(id);
    }

    async save(email: Email): Promise<void> {
        await this.repository.save(email)
    }
}

export { EmailsRepository }