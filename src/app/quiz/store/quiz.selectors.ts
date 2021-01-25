import { createSelector } from "@ngrx/store";
import { AppState } from "@shared/store/app-state";

export const selectQuiz = (appState: AppState) => appState.quiz;

export const selectQuizEditData = createSelector(
    selectQuiz,
    state => state.editData
);

export const selectQuizPreview = createSelector(
    selectQuiz,
    state => state.previewData
);

export const selectQuizApproachesCount = createSelector(
    selectQuiz,
    state => state.approaches?.count
);

export const selectQuizComplete = createSelector(
    selectQuiz,
    state => state.quizComplete
);

export const selectQuizTime = createSelector(
    selectQuiz,
    state => state.time
);

export const selectQuizLoading = createSelector(
    selectQuiz,
    state => state.loading
);

export const selectQuizApproachesLoading = createSelector(
    selectQuiz,
    state => state.approachesLoading
);

export const selectQuizCompleteLoading = createSelector(
    selectQuiz,
    state => state.quizCompleteLoading
)
