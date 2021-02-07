export interface UserModel {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly isAdmin: boolean;
    token?: string;
}