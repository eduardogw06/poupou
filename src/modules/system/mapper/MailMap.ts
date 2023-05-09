import { classToClass } from 'class-transformer';
import { IEmailResponseDTO } from '../dtos/IEmailResponseDTO';
import { Email } from '../entities/Email';
class EmailMap {
    static toDTO({
        uuid,
        description,
        warning,
        subject,
        content,
        active
    }: Email): IEmailResponseDTO {
        const email = classToClass({
            uuid,
            description,
            warning,
            subject,
            content,
            active
        });
        return email;
    }
}

export { EmailMap };
