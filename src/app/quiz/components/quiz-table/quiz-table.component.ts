import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { QuizRestApiService } from '@shared/api-service/quiz/quiz.service';
import { ConfirmEntryComponent } from '@shared/components/confirm-entry/confirm-entry.component';
import { ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { IdModel } from '@shared/model/components/id.model';
import { QuizModel } from '@shared/model/quiz.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import * as QuizActions from '../../store/quiz.actions';
import { selectQuizLoading } from '../../store';
import { HeaderService } from '@shared/service/header.service';
@Component({
  selector: 'app-quiz-table',
  templateUrl: './quiz-table.component.html',
  styleUrls: ['./quiz-table.component.scss']
})
export class QuizViewsComponent implements OnInit, AfterViewInit {

  public columns: Array<string> = ['lp', 'title', 'startDate', 'endingDate', 'time', 'category', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  public dataSource = new QuizDataSource<QuizModel>(this._quizService);

  addQuiz() {
    this._router.navigate(['/q/quiz/add-quiz'])
  }

  constructor(
    private readonly _router: Router,
    private readonly _quizService: QuizRestApiService,
    private readonly _dialogService: MatDialog,
    private readonly _headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this._headerService.setAction({
      icon: 'add',
      text: 'Dodaj quiz',
      action: () => this._router.navigate(['/q/quiz/add-quiz'])
    })
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sorter = this.matSort;
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
          action: QuizActions.DELETE_QUIZ,
          loadingSelector: selectQuizLoading
        }
      }
    ).afterClosed().toPromise().then(() => this.dataSource.loadData())
  }

}
