import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap } from "rxjs/operators";
import { CasSecurityRestApi } from "@shared/api-service/cas-security.service";
import { UrlModel } from "@shared/model/auth.model";
import { UserModel } from "@shared/model/root.model";
import * as AuthActions from './auth.actions';
import * as ToastrActions from '../../shared/store/toast/toastr.actions';
import { LocalStorage } from "@shared/service/local-storage.service";
import * as RedirectionActions from '@shared/store/redirection/redirection.actions';
import * as RootActions from '@shared/root-store/root.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _authService: CasSecurityRestApi,
    ) {}

    getCasUrl$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.LOAD_CAS_URL),
            switchMap(() =>
                this._authService.get<UrlModel>({
                    additionalPath: 'login'
                }).pipe(
                    map(data => AuthActions.LOAD_CAS_URL_SUCCESS(data)),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        AuthActions.LOAD_CAS_URL_ERROR()
                    ))
                )
            )
        )
    );

    getToken$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.LOAD_TOKEN),
            switchMap(res =>
                this._authService.get<UserModel>({
                    additionalPath: `token/${res.uuid}`
                }).pipe(
                    map(data => {
                        LocalStorage.setAuth(data);
                        delete data.token;
                        return data;
                    }),
                    delay(3000),
                    mergeMap(data => [
                        RedirectionActions.REDIRECT({ url: '/q/dashboard' }),
                        RootActions.SET_USER(data),
                        AuthActions.EXTEND_LOADER()
                    ]),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        AuthActions.DISCARD_LOADING()
                    ))
                )
            )
        )
    );

    extendLoader$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.EXTEND_LOADER),
            delay(1000),
            switchMap(() => of(AuthActions.DISCARD_LOADING()))
        )
    );
}