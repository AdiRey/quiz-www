import { Action, createReducer, on } from "@ngrx/store";
import { initialQuizState, QuizState } from "./quiz.state";
import * as QuizActions from './quiz.actions';

const _quizReducer = createReducer(
    initialQuizState,

    on(QuizActions.LOAD_ALL_QUIZES, state => ({ ...state, loading: true })),
    on(QuizActions.LOAD_ALL_QUIZES_SUCCESS, state => ({ ...state, loading: false })),

    on(QuizActions.LOAD_QUIZ, state => ({ ...state, loading: true })),
    on(QuizActions.SET_QUIZ, (state, res) => ({ ...state, editData: res, loading: false })),

    on(QuizActions.EDIT_QUIZ, state => ({ ...state, loading: true })),
    on(QuizActions.EDIT_QUIZ_SUCCESS, state => ({ ...state, loading: false })),

    on(QuizActions.SAVE_QUIZ, state => ({...state, loading: true})),
    on(QuizActions.SAVE_QUIZ_SUCCESS, state => ({...state, loading: false })),

    on(QuizActions.DELETE_QUIZ, state => ({ ...state, loading: true })),
    on(QuizActions.DELETE_QUIZ_SUCCESS, state => ({ ...state, loading: false })),

    on(QuizActions.DISCARD_LOADING, state => ({ ...state, loading: false }))
);

export function quizReducer(state: QuizState | undefined, action: Action) {
    return _quizReducer(state, action);
}