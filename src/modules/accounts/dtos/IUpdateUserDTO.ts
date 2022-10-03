interface IUpdateUserDTO {
    user_id: string;
    name?: string;
    email: string;
    dark_theme?: boolean;
}

export { IUpdateUserDTO }