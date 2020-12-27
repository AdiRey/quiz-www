import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, switchMap } from "rxjs/operators";
import { CasSecurityRestApi } from "src/app/shared/api-service/cas-security/cas-security.service";
import { UrlModel } from "src/app/shared/model/auth/auth.model";
import * as AuthActions from './auth.actions';
import * as ToastrActions from '../../shared/store/toast/toastr.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _authService: CasSecurityRestApi
    ) {}

    getCasUrl$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AuthActions.LOAD_CAS_URL),
            switchMap(() =>
                this._authService.get<UrlModel>('login.json').pipe(
                    map(data => AuthActions.LOAD_CAS_URL_SUCCESS(data)),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        AuthActions.DISCARD_LOADING()
                    ))
                )
            )
        )
    );
}