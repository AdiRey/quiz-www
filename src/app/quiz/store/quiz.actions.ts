import { createAction, props } from "@ngrx/store";
import { IdModel } from "@shared/model/components/id.model";
import { QuizModel, QuizApproachesModel, QuizStartModel, UserQuizWrappedModel } from "@shared/model/quiz.model";


export const LOAD_QUIZ = createAction('[quiz] LOAD_QUIZ', props<IdModel>());
export const SET_QUIZ = createAction('[quiz] SET_QUIZ', props<QuizModel>());

export const EDIT_QUIZ = createAction('[quiz] EDIT_QUIZ', props<QuizModel>());
export const EDIT_QUIZ_SUCCESS = createAction('[quiz] EDIT_QUIZ_SUCCESS');

export const SAVE_QUIZ = createAction('[quiz] SAVE_QUIZ', props<QuizModel>());
export const SAVE_QUIZ_SUCCESS = createAction('[quiz] SAVE_QUIZ_SUCCESS');

export const DELETE_QUIZ = createAction('[quiz] DELETE_QUIZ', props<IdModel>());
export const DELETE_QUIZ_SUCCESS = createAction('[quiz] DELETE_QUIZ_SUCCESS');

export const START_QUIZ_PREVIEW = createAction('[quiz] START_QUIZ_PREVIEW', props<QuizModel>());

export const LOAD_QUIZ_PREVIEW = createAction('[quiz LOAD_QUIZ_PREVIEW', props<IdModel>());
export const SET_QUIZ_PREVIEW = createAction('[quiz] SET_QUIZ_PREVIEW', props<Object>());

export const LOAD_QUIZ_APPROACHES = createAction('[quiz] LOAD_QUIZ_APPROACHES', props<IdModel>());
export const LOAD_QUIZ_APPROACHES_SUCCESS = createAction('[quiz] LOAD_QUIZ_APPROACHES_SUCCESS', props<QuizApproachesModel>());

export const START_QUIZ_COMPLETE = createAction('[quiz] START_QUIZ_COMPLETE', props<{id: number | string; time: number}>());
export const LOAD_QUIZ_COMPLETE = createAction('[quiz] LOAD_QUIZ_COMPLETE', props<IdModel>());
export const LOAD_QUIZ_COMPLETE_SUCCESS = createAction('[quiz] LOAD_QUIZ_COMPLETE_SUCCESS', props<QuizStartModel>());

export const SAVE_USER_QUIZ_COMPLETE = createAction('[quiz] SAVE_USER_QUIZ_COMPLETE', props<UserQuizWrappedModel>());
export const SAVE_USER_QUIZ_COMPLETE_SUCCESS = createAction('[quiz] SAVE_USER_QUIZ_COMPLETE_SUCCESS');

export const CLEAR_EDIT_DATA = createAction('[quiz] CLEAR_EDIT_DATA');
export const CLEAR_PREVIEW_DATA = createAction('[quiz] CLEAR_PREVIEW_DATA');

export const CLOSE_ALL_DIALOGS = createAction('[quiz] CLOSE_ALL_DIALOGS');
export const CLOSE_LAST_OPENED_DIALOG = createAction('[quiz] CLOSE_LAST_OPENED_DIALOG');

export const DISCARD_LOADING = createAction('[quiz] DISCARD_LOADING');
export const DISCARD_APPROACHES_LOADING = createAction('[quiz] DISCARD_APPROACHES_LOADING');
export const DISCARD_QUIZ_COMPLETE_LOADING = createAction('[quiz] DISCARD_QUIZ_COMPLETE_LOADING');
