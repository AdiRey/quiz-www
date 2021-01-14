import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import * as RedirectionActions from './redirection.actions';


@Injectable({
    providedIn: 'root'
})
export class RedirectionEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _router: Router
    ) {}

    redirect$ = createEffect(() =>
        this._actions$.pipe(
            ofType(RedirectionActions.REDIRECT),
            tap(data =>
                this._router.navigate([data.url])
            )
        ), { dispatch: false }
    );
}