import { createAction, props } from "@ngrx/store";
import { UrlModel } from "src/app/shared/model/auth/auth.model";

export const LOAD_CAS_URL = createAction('[auth] LOAD_CAS_URL');
export const LOAD_CAS_URL_SUCCESS = createAction('[auth] LOAD_CAS_URL_SUCCESS', props<UrlModel>());
export const DISCARD_LOADING = createAction('[auth] DISCARD_LOADING');
