import mail from "@sendgrid/mail";
import { AppError } from "../errors/AppError";

interface sendMailProps {
    to: string;
    from: string;
    subject: string;
    content: string;
}

export const sendMail = async ({
    to,
    from,
    subject,
    content
}: sendMailProps): Promise<boolean> => {
    mail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
        to,
        from,
        subject,
        html: content,
        charset: 'utf-8',
    };

    try {
        await mail.send(msg)
        return true;
    } catch (e) {
        const errorMessage = e.response?.body?.errors?.[0]?.message ?? "Houve um erro ao enviar o e-mail";
        console.log(errorMessage);
        throw new AppError(errorMessage, 500);
    }
}