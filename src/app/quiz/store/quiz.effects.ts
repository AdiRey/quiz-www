import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, tap, catchError, mergeMap } from "rxjs/operators";
import * as QuizActions from '../store/quiz.actions';
import * as ToastrActions from '../../shared/store/toast/toastr.actions';
import { QuizRestApiService } from '../../shared/api-service/quiz/quiz.service';
import { of } from "rxjs";
import { QuizModel } from "@shared/model/quiz.model";
import { MatDialog } from "@angular/material/dialog";


@Injectable({
    providedIn: 'root'
})
export class QuizEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _quizService: QuizRestApiService,
        private readonly _dialogService: MatDialog
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
                        QuizActions.DISCARD_LOADING(),
                        ToastrActions.SHOW_ERROR({ message: error })
                    ))
                )
            )
        )
    );

    loadQuiz$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.LOAD_QUIZ),
            switchMap(res =>
                this._quizService.get<QuizModel>({
                    additionalPath: `details/${res.id}`
                }).pipe(
                    mergeMap(res => [
                        QuizActions.SET_QUIZ(res),
                        ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie załadowano quiz.' })
                    ]),
                    catchError(error => of(
                        QuizActions.DISCARD_LOADING(),
                        ToastrActions.SHOW_ERROR({ message: error })
                    ))
                )
            )
        )
    );

    editQuiz$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.EDIT_QUIZ),
            switchMap(res =>
                this._quizService.update<null>({
                    additionalPath: `details/${res.id}`,
                    body: res
                }).pipe(
                    mergeMap(() => [
                        QuizActions.EDIT_QUIZ_SUCCESS(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie edytowano quiz.' })
                    ]),
                    catchError(error => of(
                        QuizActions.DISCARD_LOADING(),
                        ToastrActions.SHOW_ERROR({ message: error })
                    ))
                )
            )
        )
    );

    deleteQuiz$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.DELETE_QUIZ),
            switchMap(res =>
                this._quizService.delete<null>({
                    additionalPath: `delete/${res.id}`
                }).pipe(
                    mergeMap(() => [
                        QuizActions.DELETE_QUIZ_SUCCESS(),
                        QuizActions.CLOSE_ALL_DIALOGS(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie usunięto quiz.' })
                    ]),
                    catchError(error => of(
                        QuizActions.DISCARD_LOADING(),
                        ToastrActions.SHOW_ERROR({ message: error })
                    ))
                )
            )
        )
    );

    closeDialogs$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.CLOSE_ALL_DIALOGS),
            tap(() => this._dialogService.closeAll())
        ), { dispatch: false }
    );
    
}