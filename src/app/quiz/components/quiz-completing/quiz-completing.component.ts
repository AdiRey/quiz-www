import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmEntryComponent } from '@shared/components/confirm-entry/confirm-entry.component';
import { ActionType, ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { UserQuizModel, UserQuizWrappedModel } from '@shared/model/quiz.model';
import { AppState } from '@shared/store/app-state';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { selectQuizComplete, selectQuizCompleteLoading, selectQuizTime } from '../../store';
import * as QuizActions from '../../store/quiz.actions';

@Component({
  selector: 'app-quiz-completing',
  templateUrl: './quiz-completing.component.html',
  styleUrls: ['./quiz-completing.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false}
  }]
})
export class QuizCompletingComponent implements OnInit, OnDestroy {

  private _questions: Array<UserQuizModel> = [];

  public loading$: Observable<boolean> = this._store.select(selectQuizCompleteLoading);

  public quizComplete$ = this._store.select(selectQuizComplete).pipe(filter(f => f != null));

  public timer: string;
  private _interval;


  constructor(
    private readonly _store: Store<AppState>,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._store.dispatch(QuizActions.LOAD_QUIZ_COMPLETE({ id: this._activatedRoute.snapshot.paramMap.get('quizId') }));
    this._store.select(selectQuizTime).subscribe(
      data => this._setTime(data)
    );
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }

  _setTime(time: number | null) {
    if (time == null) {
      this.timer = 'Brak limitu';
    } else {
      let now, distance, hours, minutes, seconds, desTime = new Date().getTime() + (time * 60000);
      this._interval = setInterval(() => {
        now = new Date().getTime();
        distance = desTime - now;
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.timer = hours + 'godz. ' + minutes + 'min. ' + seconds + 's';
        if (distance < 0) {
          clearInterval(this._interval);
        }
      }, 1000);
    }
  }

  public setAnswerToQuestionCheckbox(questionId: number, answerId: number, status: any) {
    if (!this._questions.filter(question => question.questionId === questionId)[0]) {
      this._questions.push({
        questionId: questionId,
        answersId: []
      });
    }
    const question = this._questions.filter(question => question.questionId === questionId)[0];
    if (status) {
      this._questions[this._questions.indexOf(question)].answersId.splice(question.answersId.indexOf(answerId), 1);
    } else {
      this._questions[this._questions.indexOf(question)].answersId.push(answerId);
    }
    console.log('q', this._questions);
  }

  public setAnswerToQuestionRadio(questionId: number, answerId: number) {
    if (!this._questions.filter(question => question.questionId === questionId)[0]) {
      this._questions.push({
        questionId: questionId,
        answersId: []
      });
    }
    this._questions.filter(question => question.questionId === questionId)[0].answersId = [answerId];
    console.log('qr', this._questions);
  }

  public save() {
    this._matDialog.open<ConfirmEntryComponent, ConfirmModel<UserQuizWrappedModel, any>>(ConfirmEntryComponent,{
      data: {
        message: 'Czy na pewno chcesz zakończyć quiz?',
        element: {
          array: this._questions
        },
        action: QuizActions.SAVE_USER_QUIZ_COMPLETE,
        actionType: ActionType.SAVE,
        loadingSelector: selectQuizCompleteLoading
      }
    });
  }

}
