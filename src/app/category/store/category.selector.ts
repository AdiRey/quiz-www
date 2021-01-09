import { createSelector } from "@ngrx/store";
import { AppState } from "@shared/store/app-state";


export const selectCategory = (appState: AppState) => appState.category;

export const selectLoading = createSelector(
    selectCategory,
    state => state.loading
);
