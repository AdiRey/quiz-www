export interface AuthState {
    url: string;
    loading: boolean;
}

export const initialAuthState: AuthState = {
    url: null,
    loading: false
};
