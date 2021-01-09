import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, mergeMap, switchMap } from "rxjs/operators";
import { CategoryRestApiService } from "src/app/shared/api-service/category/category.service";
import * as CategoryActions from '../store/category.actions';
import * as ToastrActions from '../../shared/store/toast/toastr.actions';



export class CategoryEffect {

    constructor(
        private readonly _actions: Actions,
        private readonly _categoryService: CategoryRestApiService
    ) {}

    addCategory$ = createEffect(() =>
        this._actions.pipe(
            ofType(CategoryActions.ADD_CATEGORY),
            switchMap(req =>
                this._categoryService.save({
                    additionalPath: 'create',
                    body: req
                }).pipe(
                    mergeMap(() => [
                        CategoryActions.ADD_CATEGORY_SUCCESS(),
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
        this._actions.pipe(
            ofType(CategoryActions.EDIT_CATEGORY),
            switchMap(req =>
                this._categoryService.update<null>({
                    additionalPath: 'update',
                    body: req
                }).pipe(
                    mergeMap(() => [
                        CategoryActions.ADD_CATEGORY_SUCCESS(),
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
        this._actions.pipe(
            ofType(CategoryActions.DELETE_CATEGORY),
            switchMap(req =>
                this._categoryService.delete<null>({
                    additionalPath: `delete/${req.id}`
                }).pipe(
                    mergeMap(() => [
                        CategoryActions.DELETE_CATEGORY_SUCCESS(),
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
}