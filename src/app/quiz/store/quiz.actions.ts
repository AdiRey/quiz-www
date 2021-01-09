import { createAction, props } from "@ngrx/store";
import { QuizModel } from "@shared/model/quiz.model";


export const LOAD_ALL_QUIZES = createAction('[quiz] LOAD_ALL_QUIZES');
export const LOAD_ALL_QUIZES_SUCCESS = createAction('[quiz] LOAD_ALL_QUIZES_SUCCESS');

export const SAVE_QUIZ = createAction('[quiz] SAVE_QUIZ', props<QuizModel>());
export const SAVE_QUIZ_SUCCESS = createAction('[quiz] SAVE_QUIZ_SUCCESS');

export const DISCARD_LOADING = createAction('[quiz] DISCARD_LOADING');
