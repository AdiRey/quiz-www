import { UserModel } from "src/app/shared/model/auth.model";

export interface AuthState {
    url: string;
    userData: UserModel;
    loading: boolean;
}

export const initialAuthState: AuthState = {
    url: null,
    userData: null,
    loading: false
};
