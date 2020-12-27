import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs/operators";
import * as ToastrActions from './toastr.actions';


@Injectable({
    providedIn: 'root'
})
export class ToastrEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _toastrService: ToastrService
    ) {}

    showSuccess$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ToastrActions.SHOW_SUCCESS),
            tap(data =>
                this._toastrService.success(data.message)
            )
        ), { dispatch: false }
    );

    showError$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ToastrActions.SHOW_ERROR),
            tap(data =>
                this._toastrService.error(data.message)
            )
        ), { dispatch: false }
    );

    showWarning$ = createEffect(() =>
        this._actions$.pipe(
            ofType(ToastrActions.SHOW_WARNING),
            tap(data =>
                this._toastrService.warning(data.message)
            )
        ), { dispatch: false }
    );
}