import { createSelector } from "@ngrx/store";
import { AppState } from "@shared/store/app-state";


export const selectRoot = (appState: AppState) => appState.root;

export const selectRootUser = createSelector(
    selectRoot,
    state => state.user
);
