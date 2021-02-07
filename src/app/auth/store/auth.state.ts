import { UserModel } from "@shared/model/root.model";

export interface AuthState {
    url: string;
    userData: UserModel;
    loading: boolean;
    error: boolean;
}

export const initialAuthState: AuthState = {
    url: null,
    userData: null,
    loading: false,
    error: false
};
