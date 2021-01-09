import { Action, createReducer, on } from "@ngrx/store";
import { CategoryState, initialCategoryState } from "./category.state";
import * as CategoryActions from '../store/category.actions';

const _categoryReducer = createReducer(
    initialCategoryState,

    on(CategoryActions.ADD_CATEGORY, state => ({ ...state, loading: true })),
    on(CategoryActions.ADD_CATEGORY_SUCCESS, state => ({ ...state, loading: false })),

    on(CategoryActions.START_EDIT_CATEGORY, (state, res) => ({ ...state, editData: res })),

    on(CategoryActions.EDIT_CATEGORY, state => ({ ...state, loading: true })),
    on(CategoryActions.EDIT_CATEGORY_SUCCESS, state => ({ ...state, loading: false })),

    on(CategoryActions.DELETE_CATEGORY, state => ({ ...state, loading: true })),
    on(CategoryActions.DELETE_CATEGORY_SUCCESS, state => ({ ...state, loading: false })),

    on(CategoryActions.DISCARD_LOADING, state => ({ ...state, loading: false }))
);


export function categoryReducer(state: CategoryState | undefined, action: Action ) {
    return _categoryReducer(state, action)
}
