import { createAction, props } from "@ngrx/store";
import { ChartModel, ChartWrappedModel, CountModel } from "@shared/model/dashboard.model";

export const LOAD_TILES = createAction('[dashboard] LOAD_TILES', props<CountModel>());

export const LOAD_TILE_CATEGORY_COUNT = createAction('[dashboard] LOAD_TILE_CATEGORY_COUNT');
export const LOAD_TILE_CATEGORY_COUNT_SUCCESS = createAction('[dashboard] LOAD_TILE_CATEGORY_COUNT_SUCCESS', props<CountModel>());
export const LOAD_TILE_QUIZ_COUNT = createAction('[dashboard] LOAD_TILE_QUIZ_COUNT');
export const LOAD_TILE_QUIZ_COUNT_SUCCESS = createAction('[dashboard] LOAD_TILE_QUIZ_COUNT_SUCCESS', props<CountModel>());
export const LOAD_TILE_USER_COUNT = createAction('[dashboard] LOAD_TILE_USER_COUNT');
export const LOAD_TILE_USER_COUNT_SUCCESS = createAction('[dashboard] LOAD_TILE_USER_COUNT_SUCCESS', props<CountModel>());
export const LOAD_TILE_ACTIVE_COUNT = createAction('[dashboard] LOAD_TILE_ACTIVE_COUNT');
export const LOAD_TILE_ACTIVE_COUNT_SUCCESS = createAction('[dashboard] LOAD_TILE_ACTIVE_COUNT_SUCCESS', props<CountModel>());

export const LOAD_CHART = createAction('[dashboard] LOAD_CHART');
export const LOAD_CHART_SUCCESS = createAction('[dashboard] LOAD_CHART_SUCCESS', props<ChartWrappedModel>());

export const CLEAR_CHART = createAction('[dashboard] CLEAR_CHART');
export const CLEAR_TILES = createAction('[dashboard] CLEAR_TILES');

export const DISCARD_TILES_LOADING = createAction('[dashboard] DISCARD_TILES_LOADING');
export const DISCARD_CHART_LOADING = createAction('[dashboard] DISCARD_CHART_LOADING');
