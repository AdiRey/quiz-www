import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { QuizRestApiService } from '@shared/api-service/quiz.service';
import { ConfirmEntryComponent } from '@shared/components/confirm-entry/confirm-entry.component';
import { ActionType, ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { IdModel } from '@shared/model/components/id.model';
import { QuizModel } from '@shared/model/quiz.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import * as QuizActions from '../../store/quiz.actions';
import { selectQuizLoading } from '../../store';
import { HeaderService } from '@shared/service/header.service';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store/app-state';
import { filter } from 'rxjs/operators';
import { DialogHandlerService } from '@shared/service/dialog-handler.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-quiz-table',
  templateUrl: './quiz-table.component.html',
  styleUrls: ['./quiz-table.component.scss']
})
export class QuizTableComponent implements OnInit, AfterViewInit {

  public columns: Array<string> = ['lp', 'title', 'startDate', 'endingDate', 'time', 'category', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  public form: FormGroup;

  public dataSource = new QuizDataSource<QuizModel>(this._quizService);

  addQuiz() {
    this._router.navigate(['/q/quiz/add-quiz'])
  }

  constructor(
    private readonly _router: Router,
    private readonly _quizService: QuizRestApiService,
    private readonly _dialogService: MatDialog,
    private readonly _headerService: HeaderService,
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      title: [null]
    });
    this._headerService.setAction({
      icon: 'add',
      text: 'Dodaj quiz',
      action: () => this._router.navigate(['/q/quiz/add-quiz'])
    })
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.form = this.form;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sorter = this.matSort;
  }

  public preview(element: QuizModel) {
    this._store.dispatch(QuizActions.START_QUIZ_PREVIEW(element));
  }

  public edit(element: QuizModel) {
    this._router.navigate([`/q/quiz/edit-quiz/${element.id}`]);
  }

  public delete(element: QuizModel) {
    this._dialogService.open<ConfirmEntryComponent, ConfirmModel<QuizModel, IdModel>>(
      ConfirmEntryComponent, {
        data: {
          element: element,
          message: 'Czy na pewno chcesz usunąć ten quiz?',
          actionType: ActionType.DELETE,
          action: QuizActions.DELETE_QUIZ,
          loadingSelector: selectQuizLoading
        }
      }
    ).afterClosed()
      .toPromise()
      .then(data => {
        if (data != null) {
          this.dataSource.loadData();
        };
      });
  }

}
