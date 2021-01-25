import { createAction, props } from "@ngrx/store";
import { NewsWrappedModel } from "@shared/model/news.model";


export const LOAD_CATEGORIES = createAction('[news] LOAD_CATEGORIES');
export const LOAD_CATEGORIES_SUCCESS = createAction('[news] LOAD_CATEGORIES_SUCCESS', props<NewsWrappedModel>());


export const DISCARD_LOADING = createAction('[news] DISCARD_LOADING');