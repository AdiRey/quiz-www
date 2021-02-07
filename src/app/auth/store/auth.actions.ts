import { createAction, props } from "@ngrx/store";
import { UrlModel, UUIDModel } from "@shared/model/auth.model";
import { UserModel } from "@shared/model/root.model";

export const LOAD_CAS_URL = createAction('[auth] LOAD_CAS_URL');
export const LOAD_CAS_URL_SUCCESS = createAction('[auth] LOAD_CAS_URL_SUCCESS', props<UrlModel>());
export const LOAD_CAS_URL_ERROR = createAction('[auth] LOAD_CAS_URL_ERROR');

export const LOAD_TOKEN = createAction('[auth] LOAD_TOKEN', props<UUIDModel>());
export const LOAD_TOKEN_SUCCESS = createAction('[auth] LOAD_TOKEN_SUCCESS', props<UserModel>());

export const SET_USER_DATA = createAction('[auth] SET_USER_DATA', props<UserModel>());

export const EXTEND_LOADER = createAction('[auth] EXTEND_LOADER');

export const DISCARD_LOADING = createAction('[auth] DISCARD_LOADING');
