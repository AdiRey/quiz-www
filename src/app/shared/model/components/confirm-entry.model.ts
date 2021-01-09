import { ActionCreator, MemoizedSelector } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { AppState } from "@shared/store/app-state";

export interface ConfirmModel<M = any, T = any> {
    message: string,
    element: M,
    action: ActionCreator<string, (props: T) => T & TypedAction<string>>;
    loadingSelector: MemoizedSelector<AppState, boolean>
}