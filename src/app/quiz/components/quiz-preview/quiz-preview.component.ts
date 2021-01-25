import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store/app-state';
import { filter } from 'rxjs/operators';
import { selectQuizPreview, selectQuizLoading, selectQuizApproachesCount } from '../../store';
import * as QuizActions from '../../store/quiz.actions';

@Component({
  selector: 'app-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.scss']
})
export class QuizPreviewComponent implements OnInit, OnDestroy {

  public quizPreview$ = this._store.select(selectQuizPreview).pipe(filter(f => f != null));
  public loading$ = this._store.select(selectQuizLoading);
  public approachesCount$ = this._store.select(selectQuizApproachesCount).pipe(filter(f => f != null));

  public defaultImage: string = '../../../../assets/images/quiz-default.jpg';

  private readonly _id: number = Number(this._activatedRoute.snapshot.paramMap.get('quizId'));

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this._store.dispatch(QuizActions.LOAD_QUIZ_PREVIEW({ id: this._id }));
    this._store.dispatch(QuizActions.LOAD_QUIZ_APPROACHES({ id: this._id }))
  }

  ngOnDestroy(): void {
    this._store.dispatch(QuizActions.CLEAR_PREVIEW_DATA());
  }

  public startQuiz(time: number) {
    this._store.dispatch(QuizActions.START_QUIZ_COMPLETE({ id: this._id, time: time }));
  }

  getCorrectDate(startDate: number, endingDate: number): boolean {
    const currentDate = new Date().getTime();
    if (startDate && endingDate) {
      return !(startDate <= currentDate && currentDate <= endingDate);
    } else if (startDate) {
      return !(startDate <= currentDate);
    } else if (endingDate) {
      return !(currentDate <= endingDate);
    } else {
      return false;
    }
  }
}
