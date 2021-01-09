import { createSelector } from "@ngrx/store";
import { AppState } from "@shared/store/app-state";

export const selectQuiz = (appState: AppState) => appState.quiz;

export const selectQuizEditData = createSelector(
    selectQuiz,
    state => state.editData
);

export const selectQuizLoading = createSelector(
    selectQuiz,
    state => state.loading
);
