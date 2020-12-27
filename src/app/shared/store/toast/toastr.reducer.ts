import { Action, createReducer, on } from "@ngrx/store";
import { initialToastrState, ToastrState } from "./toast.state";
import * as ToastrActions from './toastr.actions';

const _toastrReducer = createReducer(
    initialToastrState,
    on(ToastrActions.SHOW_SUCCESS, (state, res) => ({ ...state, message: res.message })),
    on(ToastrActions.SHOW_ERROR, (state, res) => ({ ...state, message: res.message })),
    on(ToastrActions.SHOW_WARNING, (state, res) => ({ ...state, message: res.message }))
)

export function toastrReducer(state: ToastrState | undefined, action: Action) {
    return _toastrReducer(state, action);
}
