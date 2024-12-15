export type TLoginUser = {
    email: string,
    password:string
}

export type TChangePassword = {
    existingPassword: string
    newPassword: string
    confirmPassword: string
}
