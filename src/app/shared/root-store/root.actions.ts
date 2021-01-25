import { createAction, props } from "@ngrx/store";
import { UserModel } from "@shared/model/root.model";


export const SET_USER = createAction('[root] SET_USER', props<UserModel>());

export const CLEAR_USER = createAction('[root] CLEAR_USER');
