import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { QuizRestApiService } from "@shared/api-service/quiz.service";
import { NewsModel } from "@shared/model/news.model";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as NewsActions from './news.actions';
import * as ToastrActions from '@shared/store/toast/toastr.actions';
import { of } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class NewsEffect {


    constructor(
        private readonly _actions: Actions,
        private readonly _quizService: QuizRestApiService
    ) {}


    loadLatestQuzies$ = createEffect(() =>
        this._actions.pipe(
            ofType(NewsActions.LOAD_CATEGORIES),
            switchMap(() =>
                this._quizService.get<Array<NewsModel>>({
                    additionalPath: 'latest'
                }).pipe(
                    mergeMap(data => [
                        NewsActions.LOAD_CATEGORIES_SUCCESS({
                            content: data
                        })
                    ]),
                    catchError(error => of(
                        NewsActions.DISCARD_LOADING(),
                        ToastrActions.SHOW_ERROR({ message: error })
                    ))
                )
            )
        )
    );
}