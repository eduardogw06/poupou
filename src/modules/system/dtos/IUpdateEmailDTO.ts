interface IUpdateEmailsDTO {
    user_id: string;
    email_id: string;
    description: string;
    warning: string;
    subject: string;
    content: string;
    active: boolean;
}

export { IUpdateEmailsDTO };