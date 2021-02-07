import { Action, createReducer, on } from "@ngrx/store";
import { DashboardState, initialDashboardState } from "./dashboard.state";
import * as DashboardActions from './dashboard.actions';

const _dashboardReducer = createReducer(
    initialDashboardState,
    on(DashboardActions.LOAD_TILES, (state, res) => ({ ...state, countTileLoadingNumber: res.count })),
    on(DashboardActions.LOAD_TILE_CATEGORY_COUNT_SUCCESS, (state, res) => ({
        ...state,
        countTileLoadingNumber: !state.countTileLoadingNumber ? state.countTileLoadingNumber : state.countTileLoadingNumber - 1,
        categoryCount: {
            name: 'Ilość kategorii',
            value: res.count
        }
    })),
    on(DashboardActions.LOAD_TILE_QUIZ_COUNT_SUCCESS, (state, res) => ({
        ...state,
        countTileLoadingNumber: !state.countTileLoadingNumber ? state.countTileLoadingNumber : state.countTileLoadingNumber - 1,
        quizCount: {
            name: 'Ilość quizów',
            value: res.count
        }
    })),
    on(DashboardActions.LOAD_TILE_USER_COUNT_SUCCESS, (state, res) => ({
        ...state,
        countTileLoadingNumber: !state.countTileLoadingNumber ? state.countTileLoadingNumber : state.countTileLoadingNumber - 1,
        userCount: {
            name: 'Ilość użytkowników',
            value: res.count
        }
    })),
    on(DashboardActions.LOAD_TILE_ACTIVE_COUNT_SUCCESS, (state, res) => ({
        ...state,
        countTileLoadingNumber: !state.countTileLoadingNumber ? state.countTileLoadingNumber : state.countTileLoadingNumber - 1,
        activeCount: {
            name: 'Ostatnio aktywnych',
            value: res.count
        }
    })),

    on(DashboardActions.LOAD_CHART, state => ({ ...state, loadingChart: true })),
    on(DashboardActions.LOAD_CHART_SUCCESS, (state, res) => ({ ...state, chart: { content: res.content }, loadingChart: false })),

    on(DashboardActions.LOAD_CATEGORIES_COUNT, state => ({ ...state, categoryQuizLoading: true })),
    on(DashboardActions.LOAD_CATEGORIES_COUNT_SUCCESS, (state, res) => ({ ...state, categoryQuizCount: { content: res.content }, categoryQuizLoading: false })),

    on(DashboardActions.CLEAR_CHART, state => ({ ...state, chart: null })),
    on(DashboardActions.CLEAR_TILES, state => ({ ...state, categoryCount: null, quizCount: null, userCount: null, activeCount: null })),


    on(DashboardActions.DISCARD_CHART_LOADING, state => ({ ...state, loadingChart: false })),
    on(DashboardActions.DISCARD_TILES_LOADING, state => ({ ...state, countTileLoadingNumber: 0 })),
    on(DashboardActions.DISCARD_CATEGORY_LOADING, state => ({ ...state, categoryQuizLoading: false }))
)


export function dashboardReducer(state: DashboardState | undefined, action: Action) {
    return _dashboardReducer(state, action);
}