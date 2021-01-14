import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, mergeMap, switchMap, tap } from "rxjs/operators";
import { CategoryRestApiService } from "@shared/api-service/category/category.service";
import * as CategoryActions from '../store/category.actions';
import * as ToastrActions from '../../shared/store/toast/toastr.actions';
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";


@Injectable({
    providedIn: 'root'
})
export class CategoryEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _categoryService: CategoryRestApiService,
        private readonly _dialogService: MatDialog
    ) {}

    addCategory$ = createEffect(() =>
        this._actions$.pipe(
            ofType(CategoryActions.ADD_CATEGORY),
            switchMap(req =>
                this._categoryService.save({
                    additionalPath: 'create',
                    body: req
                }).pipe(
                    mergeMap(() => [
                        CategoryActions.ADD_CATEGORY_SUCCESS(),
                        CategoryActions.CLOSE_ALL_DIALOGS(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie utworzono kategorię' })
                    ]),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        CategoryActions.DISCARD_LOADING()
                        )
                    )
                )
            )
        )
    );

    editCategory$ = createEffect(() =>
        this._actions$.pipe(
            ofType(CategoryActions.EDIT_CATEGORY),
            switchMap(req =>
                this._categoryService.update<null>({
                    additionalPath: `update/${req.id}`,
                    body: req.body
                }).pipe(
                    mergeMap(() => [
                        CategoryActions.ADD_CATEGORY_SUCCESS(),
                        CategoryActions.CLOSE_ALL_DIALOGS(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie edytowano kategorię' })
                    ]),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        CategoryActions.DISCARD_LOADING()
                        )
                    )
                )
            )
        )
    );

    deleteCategory$ = createEffect(() =>
        this._actions$.pipe(
            ofType(CategoryActions.DELETE_CATEGORY),
            switchMap(req =>
                this._categoryService.delete<null>({
                    additionalPath: `delete/${req.id}`
                }).pipe(
                    mergeMap(() => [
                        CategoryActions.DELETE_CATEGORY_SUCCESS(),
                        CategoryActions.CLOSE_ALL_DIALOGS(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie usunięto kategorię' })
                    ]),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        CategoryActions.DISCARD_LOADING()
                        )
                    )
                )
            )
        )
    );

    closeDialogs$ = createEffect(() =>
        this._actions$.pipe(
            ofType(CategoryActions.CLOSE_ALL_DIALOGS),
            tap(() => this._dialogService.closeAll())
        ), { dispatch: false }
    );
}