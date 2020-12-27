import { createAction, props } from "@ngrx/store";

export const SHOW_SUCCESS = createAction('[toastr] SHOW_SUCCESS', props<{ message: string }>());
export const SHOW_ERROR = createAction('[toastr] SHOW_ERROR', props<{ message: string }>());
export const SHOW_WARNING = createAction('[toastr] SHOW_WARNING', props<{ message: string }>());
