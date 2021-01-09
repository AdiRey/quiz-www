import { createAction, props } from "@ngrx/store";
import { CategoryCreateModel, CategoryUpdateModel } from "@shared/model/category.model";


export const ADD_CATEGORY = createAction('[category] ADD_CATEGORY', props<CategoryCreateModel>());
export const ADD_CATEGORY_SUCCESS = createAction('[category] ADD_CATEGORY_SUCCESS');

export const START_EDIT_CATEGORY = createAction('[category] START_EDIT', props<CategoryUpdateModel>());
export const EDIT_CATEGORY = createAction('[category] EDIT_CATEGORY', props<CategoryUpdateModel>());
export const EDIT_CATEGORY_SUCCESS = createAction('[category] EDIT_CATEGORY_SUCCESS');

export const DELETE_CATEGORY = createAction('[category] DELETE_CATEGORY', props<{ id: number | string }>());
export const DELETE_CATEGORY_SUCCESS = createAction('[category] DELETE_CATEGORY_SUCCESS');

export const DISCARD_LOADING = createAction('[category] DISCARD_LOADING');

export const CLOSE_ALL_DIALOGS = createAction('[category] CLOSE_ALL_DIALOGS');
