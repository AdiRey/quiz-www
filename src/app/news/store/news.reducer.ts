import { Action, createReducer, on } from "@ngrx/store";
import { initalNewsState, NewsState } from "./news.state";
import * as NewsActions from './news.actions';


const _newsReducer = createReducer(
    initalNewsState,
    on(NewsActions.LOAD_CATEGORIES, state => ({ ...state, loading: true })),
    on(NewsActions.LOAD_CATEGORIES_SUCCESS, (state, res) => ({ ...state, loading: false, data: res.content })),
    on(NewsActions.DISCARD_LOADING, state => ({ ...state, loading: false }))
);


export function newsReducer(state: NewsState | undefined, action: Action) {
    return _newsReducer(state, action);
}