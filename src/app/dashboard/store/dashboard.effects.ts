import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryRestApiService } from "@shared/api-service/category.service";
import { QuizRestApiService } from "@shared/api-service/quiz.service";
import { UserRestApiService } from "@shared/api-service/user.service";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as DashboardActions from './dashboard.actions';
import { ChartModel, CountModel } from "@shared/model/dashboard.model";
import * as ToastrActions from '@shared/store/toast/toastr.actions';
import { of } from "rxjs";
import { UserStatisticRestApiService } from "@shared/api-service/user-statistic.service";


@Injectable({
    providedIn: 'root'
})
export class DashboardEffects {

    constructor(
        private readonly _actions$: Actions,
        private readonly _quizService: QuizRestApiService,
        private readonly _categoryService: CategoryRestApiService,
        private readonly _userService: UserRestApiService,
        private readonly _userStatisticService: UserStatisticRestApiService
    ) {}

    fireLoadingTiles$ = createEffect(() =>
        this._actions$.pipe(
            ofType(DashboardActions.LOAD_TILES),
            mergeMap(() => [
                DashboardActions.LOAD_TILE_CATEGORY_COUNT(),
                DashboardActions.LOAD_TILE_QUIZ_COUNT(),
                DashboardActions.LOAD_TILE_USER_COUNT(),
                DashboardActions.LOAD_TILE_ACTIVE_COUNT()
            ])
        )
    );

    loadTileCategoryCount$ = createEffect(() =>
        this._actions$.pipe(
            ofType(DashboardActions.LOAD_TILE_CATEGORY_COUNT),
            switchMap(() =>
                this._categoryService.get<CountModel>({
                    additionalPath: 'count'
                }).pipe(
                    map(data => DashboardActions.LOAD_TILE_CATEGORY_COUNT_SUCCESS(data)),
                    catchError(error => of(ToastrActions.SHOW_ERROR({ message: error })))
                )
            )
        )
    );

    loadTileQuizCount$ = createEffect(() =>
        this._actions$.pipe(
            ofType(DashboardActions.LOAD_TILE_QUIZ_COUNT),
            switchMap(() =>
                this._quizService.get<CountModel>({
                    additionalPath: 'count'
                }).pipe(
                    map(data => DashboardActions.LOAD_TILE_QUIZ_COUNT_SUCCESS(data)),
                    catchError(error => of(ToastrActions.SHOW_ERROR({ message: error })))
                )
            )
        )
    );

    loadTileUserCount$ = createEffect(() =>
        this._actions$.pipe(
            ofType(DashboardActions.LOAD_TILE_USER_COUNT),
            switchMap(() =>
                this._userService.get<CountModel>({
                    additionalPath: 'count'
                }).pipe(
                    map(data => DashboardActions.LOAD_TILE_USER_COUNT_SUCCESS(data)),
                    catchError(error => of(ToastrActions.SHOW_ERROR({ message: error })))
                )
            )
        )
    );

    loadTileActiveCount$ = createEffect(() =>
        this._actions$.pipe(
            ofType(DashboardActions.LOAD_TILE_ACTIVE_COUNT),
            switchMap(() =>
                this._userService.get<CountModel>({
                    additionalPath: 'latest-online'
                }).pipe(
                    map(data => DashboardActions.LOAD_TILE_ACTIVE_COUNT_SUCCESS(data)),
                    catchError(error => of(ToastrActions.SHOW_ERROR({ message: error })))
                )
            )
        )
    );

    loadChart$ = createEffect(() =>
        this._actions$.pipe(
            ofType(DashboardActions.LOAD_CHART),
            switchMap(() =>
                this._userStatisticService.get<Array<ChartModel>>({
                    additionalPath: 'count-users-online-per-day-in-week'
                }).pipe(
                    map(data => DashboardActions.LOAD_CHART_SUCCESS({ content: data })),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        DashboardActions.DISCARD_CHART_LOADING()
                    ))
                )
            )
        )
    );

    loadCategoryQuiz$ = createEffect(() =>
        this._actions$.pipe(
            ofType(DashboardActions.LOAD_CATEGORIES_COUNT),
            switchMap(() =>
                this._categoryService.get<Array<ChartModel>>({
                    additionalPath: 'statistic-count-charts'
                }).pipe(
                    map(data => DashboardActions.LOAD_CATEGORIES_COUNT_SUCCESS({ content: data })),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        DashboardActions.DISCARD_CATEGORY_LOADING()
                    ))
                )
            )
        )
    );
}
