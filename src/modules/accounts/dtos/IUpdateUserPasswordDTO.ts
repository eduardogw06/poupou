interface IUpdateUserPasswordDTO {
    email: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export { IUpdateUserPasswordDTO }