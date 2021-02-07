import { createSelector } from "@ngrx/store";
import { AppState } from "@shared/store/app-state"


export const selectNews = (appState: AppState) => appState.news;


export const selectNewsData = createSelector(
    selectNews,
    state => state.data
);

export const selectNewsDataLength = createSelector(
    selectNews,
    state => state.data && state.data.length
);

export const selectNewsLoading = createSelector(
    selectNews,
    state => state.loading
);
