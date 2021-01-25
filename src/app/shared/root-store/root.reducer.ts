import { Action, createReducer, on } from "@ngrx/store";
import { initialRootState, RootState } from "./root.state";
import * as RootActions from './root.actions';

const _rootReducer = createReducer(
    initialRootState,
    on(RootActions.SET_USER, (state, res) => ({ ...state, user: res })),
    on(RootActions.CLEAR_USER, state => ({ ...state, user: null }))
);

export function rootReducer(state: RootState | undefined, action: Action) {
    return _rootReducer(state, action);
}
