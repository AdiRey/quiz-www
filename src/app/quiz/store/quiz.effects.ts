import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, tap, catchError, mergeMap, map, withLatestFrom, delay } from "rxjs/operators";
import * as QuizActions from '../store/quiz.actions';
import * as ToastrActions from '@shared/store/toast/toastr.actions';
import * as RedirectionActions from '@shared/store/redirection/redirection.actions'
import { QuizRestApiService } from '@shared/api-service/quiz.service';
import { of } from "rxjs";
import { QuizApproachesModel, QuizModel, QuizStartModel } from "@shared/model/quiz.model";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { AppState } from "@shared/store/app-state";
import { selectQuizComplete, selectQuizEditData, selectQuizPreview } from "./quiz.selectors";
import { UserQuizRestApiService } from "@shared/api-service/user-quiz.service";
import { DialogHandlerService } from "@shared/service/dialog-handler.service";
import { LocalStorage } from "@shared/service/local-storage.service";


@Injectable({
    providedIn: 'root'
})
export class QuizEffect {

    constructor(
        private readonly _actions$: Actions,
        private readonly _quizService: QuizRestApiService,
        private readonly _userQuizService: UserQuizRestApiService,
        private readonly _dialogService: MatDialog,
        private readonly _store: Store<AppState>
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
                        QuizActions.CLOSE_LAST_OPENED_DIALOG(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Quiz pomyślnie zapisany.' }),
                        RedirectionActions.REDIRECT({ url: '/q/quiz' })
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
            withLatestFrom(this._store.select(selectQuizEditData)),
            switchMap(([res, editData]) =>
                this._quizService.update<null>({
                    additionalPath: `update/${editData.id}`,
                    body: res
                }).pipe(
                    mergeMap(() => [
                        QuizActions.EDIT_QUIZ_SUCCESS(),
                        QuizActions.CLOSE_LAST_OPENED_DIALOG(),
                        ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie edytowano quiz.' }),
                        RedirectionActions.REDIRECT({ url: '/q/quiz' })
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
                        QuizActions.CLOSE_LAST_OPENED_DIALOG(),
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

    startQuizPreview$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.START_QUIZ_PREVIEW),
            map(res => RedirectionActions.REDIRECT({ url: `/q/quiz/preview/${res.id}` }))
        )
    );

    loadPreviewQuiz$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.LOAD_QUIZ_PREVIEW),
            switchMap((res) => {
                return this._quizService.get<any>({
                        additionalPath: `preview/${res.id}`
                    }).pipe(
                        mergeMap(data => [QuizActions.SET_QUIZ_PREVIEW(data), ToastrActions.SHOW_SUCCESS({ message: 'Poprawnie załadowano quiz' })]),
                        catchError(error => of(
                            ToastrActions.SHOW_ERROR({ message: error }),
                            QuizActions.DISCARD_LOADING()
                        ))
                    )
            })
        )
    );

    loadQuizApproaches$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.LOAD_QUIZ_APPROACHES),
            switchMap(res =>
                this._userQuizService.get<QuizApproachesModel>({
                    additionalPath: `quiz/${res.id}/approaches-count`
                }).pipe(
                    map(data => QuizActions.LOAD_QUIZ_APPROACHES_SUCCESS(data)),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error }),
                        QuizActions.DISCARD_APPROACHES_LOADING()
                    ))
                )
            )
        )
    );

    startQuizComplete$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.START_QUIZ_COMPLETE),
            map(res => RedirectionActions.REDIRECT({ url: `/q/quiz/completing/${res.id}` }))
        )
    );

    loadQuizComplete$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.LOAD_QUIZ_COMPLETE),
            switchMap(res => {
                let quiz: QuizStartModel = LocalStorage.getQuiz(res.id);
                return quiz ? of(
                    QuizActions.LOAD_QUIZ_COMPLETE_SUCCESS(quiz),
                    ToastrActions.SHOW_SUCCESS({ message: 'Rozpoczęto quiz' })
                ) : this._quizService.save<QuizStartModel>({
                    additionalPath: `${res.id}/start`
                }).pipe(
                    mergeMap(data => [
                        QuizActions.LOAD_QUIZ_COMPLETE_SUCCESS(data),
                        QuizActions.SET_QUIZ_IN_LOCAL_STORAGE(data),
                        ToastrActions.SHOW_SUCCESS({ message: 'Rozpoczęto quiz' })
                    ]),
                    catchError(error => of(
                        ToastrActions.SHOW_ERROR({ message: error}),
                        QuizActions.DISCARD_QUIZ_COMPLETE_LOADING()
                    ))
                )
            })
        )
    );

    saveUserQuizComplete$ = createEffect(() =>
    this._actions$.pipe(
        ofType(QuizActions.SAVE_USER_QUIZ_COMPLETE),
        withLatestFrom(this._store.select(selectQuizComplete)),
        switchMap(([res, quiz]) =>
            this._quizService.save<null>({
                additionalPath: `${quiz.id}/stop`,
                body: res.array
            }).pipe(
                mergeMap(() => [
                    QuizActions.SAVE_USER_QUIZ_COMPLETE_SUCCESS(),
                    ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie ukończono quiz.' }),
                    QuizActions.CLOSE_ALL_DIALOGS(),
                    RedirectionActions.REDIRECT({ url: '/q/quiz' })
                ]),
                catchError(error => of(
                    ToastrActions.SHOW_ERROR({ message: error }),
                    QuizActions.DISCARD_QUIZ_COMPLETE_LOADING()
                ))
            )
        )
    ));

    setQuizInLocalStorage = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.SET_QUIZ_IN_LOCAL_STORAGE),
            tap(data => LocalStorage.setQuiz(data))
        ), { dispatch: false }
    );

    closeLastDialog$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.CLOSE_LAST_OPENED_DIALOG),
            tap(() => DialogHandlerService.closeDialog())
        ), { dispatch: false }
    );

    closeDialogs$ = createEffect(() =>
        this._actions$.pipe(
            ofType(QuizActions.CLOSE_ALL_DIALOGS),
            tap(() => this._dialogService.closeAll())
        ), { dispatch: false }
    );
    
}