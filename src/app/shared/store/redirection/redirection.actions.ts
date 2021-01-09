import { createAction, props } from "@ngrx/store";

export const REDIRECT = createAction('[redirection] REDIRECT', props<{ url: string }>());
