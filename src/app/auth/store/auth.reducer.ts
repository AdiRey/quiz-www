import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from "./auth.state";

const _authReducer = createReducer(
    initialAuthState,

    on(AuthActions.LOAD_CAS_URL, state => ({...state, loading: true})),
    on(AuthActions.LOAD_CAS_URL_SUCCESS, (state, res) => ({...state, url: res.url, loading: false})),

    on(AuthActions.LOAD_TOKEN, state => ({ ...state, loading: true})),
    on(AuthActions.LOAD_TOKEN_SUCCESS, (state, res) => ({...state, userData: res, loading: false})),

    on(AuthActions.DISCARD_LOADING, state => ({...state, loading: false}))
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}
