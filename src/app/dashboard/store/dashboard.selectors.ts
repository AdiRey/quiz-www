import { createSelector } from "@ngrx/store";
import { AppState } from "@shared/store/app-state";


export const selectDashboardState = (appState: AppState) => appState.dashboard;

export const selectCountTileLoadingNumber = createSelector(
    selectDashboardState,
    state => state.countTileLoadingNumber
);

export const selectCountTileLoadingBoolean = createSelector(
    selectDashboardState,
    state => !!state.countTileLoadingNumber
);

export const selectLoadingChart = createSelector(
    selectDashboardState,
    state => state.loadingChart
);

export const selectCategoryCount = createSelector(
    selectDashboardState,
    state => state.categoryCount
);

export const selectQuizCount = createSelector(
    selectDashboardState,
    state => state.quizCount
);

export const selectUserCount = createSelector(
    selectDashboardState,
    state => state.userCount
);

export const selectActiveCount = createSelector(
    selectDashboardState,
    state => state.activeCount
);

export const selectChart = createSelector(
    selectDashboardState,
    state => state.chart
);

export const selectCategoryQuizCount = createSelector(
    selectDashboardState,
    state => state.categoryQuizCount
);

export const selectCategoryQuizLoading = createSelector(
    selectDashboardState,
    state => state.categoryQuizLoading
);
