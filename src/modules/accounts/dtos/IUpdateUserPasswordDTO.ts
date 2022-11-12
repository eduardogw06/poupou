interface IUpdateUserPasswordDTO {
    user_id: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export { IUpdateUserPasswordDTO }