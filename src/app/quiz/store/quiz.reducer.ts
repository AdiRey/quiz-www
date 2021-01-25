import { Action, createReducer, on } from "@ngrx/store";
import { initialQuizState, QuizState } from "./quiz.state";
import * as QuizActions from './quiz.actions';

const _quizReducer = createReducer(
    initialQuizState,

    on(QuizActions.LOAD_QUIZ, state => ({ ...state, loading: true })),
    on(QuizActions.SET_QUIZ, (state, res) => ({ ...state, editData: res, loading: false })),

    on(QuizActions.EDIT_QUIZ, state => ({ ...state, loading: true })),
    on(QuizActions.EDIT_QUIZ_SUCCESS, state => ({ ...state, loading: false })),

    on(QuizActions.SAVE_QUIZ, state => ({...state, loading: true})),
    on(QuizActions.SAVE_QUIZ_SUCCESS, state => ({...state, loading: false })),

    on(QuizActions.DELETE_QUIZ, state => ({ ...state, loading: true })),
    on(QuizActions.DELETE_QUIZ_SUCCESS, state => ({ ...state, loading: false })),

    on(QuizActions.START_QUIZ_PREVIEW, (state, res) => ({ ...state, previewData: res })),
    on(QuizActions.LOAD_QUIZ_APPROACHES, state => ({ ...state, approachesLoading: true })),

    on(QuizActions.START_QUIZ_COMPLETE, (state, res) => ({ ...state, time: res.time })),

    on(QuizActions.LOAD_QUIZ_PREVIEW, state => ({ ...state, loading: true })),
    on(QuizActions.SET_QUIZ_PREVIEW, (state, res) => ({ ...state, previewData: res, loading: false })),

    on(QuizActions.LOAD_QUIZ_APPROACHES, state => ({ ...state, approachesLoading: true})),
    on(QuizActions.LOAD_QUIZ_APPROACHES_SUCCESS, (state, res) => ({ ...state, approaches: res, approachesLoading: false })),

    on(QuizActions.LOAD_QUIZ_COMPLETE, state => ({ ...state, quizCompleteLoading: true })),
    on(QuizActions.LOAD_QUIZ_COMPLETE_SUCCESS, (state, res) => ({ ...state, quizComplete: res, quizCompleteLoading: false })),

    on(QuizActions.SAVE_USER_QUIZ_COMPLETE, state => ({ ...state, quizCompleteLoading: true })),
    on(QuizActions.SAVE_USER_QUIZ_COMPLETE_SUCCESS, state => ({ ...state, quizCompleteLoading: false })),

    on(QuizActions.CLEAR_EDIT_DATA, state => ({ ...state, editData: null, loading: false })),
    on(QuizActions.CLEAR_PREVIEW_DATA, state => ({ ...state, previewData: null, approachesLoading: false })),

    on(QuizActions.DISCARD_LOADING, state => ({ ...state, loading: false })),
    on(QuizActions.DISCARD_APPROACHES_LOADING, state => ({ ...state, approachesLoading: false })),
    on(QuizActions.DISCARD_QUIZ_COMPLETE_LOADING, state => ({ ...state, quizCompleteLoading: false }))
);

export function quizReducer(state: QuizState | undefined, action: Action) {
    return _quizReducer(state, action);
}