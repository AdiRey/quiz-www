export interface UserModel {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    token?: string;
}