import { createAction, props } from "@ngrx/store";
import { IdModel } from "@shared/model/components/id.model";
import { QuizModel } from "@shared/model/quiz.model";


export const LOAD_ALL_QUIZES = createAction('[quiz] LOAD_ALL_QUIZES');
export const LOAD_ALL_QUIZES_SUCCESS = createAction('[quiz] LOAD_ALL_QUIZES_SUCCESS');

export const LOAD_QUIZ = createAction('[quiz] LOAD_QUIZ', props<IdModel>());
export const SET_QUIZ = createAction('[quiz] SET_QUIZ', props<QuizModel>());

export const EDIT_QUIZ = createAction('[quiz] EDIT_QUIZ', props<QuizModel>());
export const EDIT_QUIZ_SUCCESS = createAction('[quiz] EDIT_QUIZ_SUCCESS');

export const SAVE_QUIZ = createAction('[quiz] SAVE_QUIZ', props<QuizModel>());
export const SAVE_QUIZ_SUCCESS = createAction('[quiz] SAVE_QUIZ_SUCCESS');

export const DELETE_QUIZ = createAction('[quiz] DELETE_QUIZ', props<IdModel>());
export const DELETE_QUIZ_SUCCESS = createAction('[quiz] DELETE_QUIZ_SUCCESS');

export const CLOSE_ALL_DIALOGS = createAction('[quiz] CLOSE_ALL_DIALOGS');

export const DISCARD_LOADING = createAction('[quiz] DISCARD_LOADING');
