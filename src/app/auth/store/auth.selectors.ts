import { createSelector } from "@ngrx/store";
import { AppState } from "@shared/store/app-state";

export const selectAuth = (appState: AppState) => appState.auth;

export const selectUrl = createSelector(
    selectAuth,
    state => state.url
);

export const selectLoading = createSelector(
    selectAuth,
    state => state.loading
);

export const selectError = createSelector(
    selectAuth,
    state => state.error
);

