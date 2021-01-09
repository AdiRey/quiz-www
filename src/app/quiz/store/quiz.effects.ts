import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import * as QuizActions from '../store/quiz.actions';
import * as ToastrActions from '../../shared/store/toast/toastr.actions';
import { QuizRestApi } from '../../shared/api-service/quiz/quiz.service';
import { of } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class QuizEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _quizService: QuizRestApi
    ) {}


    saveQuiz$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.SAVE_QUIZ),
            switchMap(res =>
                this._quizService.save({
                    additionalPath: 'create',
                    body: res
                }).pipe(
                    mergeMap(() => [
                        QuizActions.SAVE_QUIZ_SUCCESS(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Quiz pomyślnie zapisany.' })
                    ]),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error })
                    ))
                )
            )
        )
    );
    
}