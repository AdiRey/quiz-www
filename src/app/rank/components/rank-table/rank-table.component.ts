import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { CategoryModel, CategoryEditModel } from '@shared/model/category.model';
import { ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { IdModel } from '@shared/model/components/id.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import { HeaderService } from '@shared/service/header.service';
import { AppState } from '@shared/store/app-state';
import { filter, tap } from 'rxjs/operators';
import { selectLoading } from 'src/app/auth/store';
import { CategoryFormComponent } from 'src/app/category/components/category-form/category-form.component';
import * as ToastrActions from '@shared/store/toast/toastr.actions';
import { UserRestApiService } from '@shared/api-service/user.service';
import { CategoryRestApiService } from '@shared/api-service/category.service';
import { Subscription } from 'rxjs';
import { QuizRestApiService } from '@shared/api-service/quiz.service';
import { QuizModel } from '@shared/model/quiz.model';

@Component({
  selector: 'app-rank-table',
  templateUrl: './rank-table.component.html',
  styleUrls: ['./rank-table.component.scss']
})
export class RankTableComponent implements OnInit {

  public columns: Array<string> = ['lp', 'title', 'names', 'result', 'percentage'];

  public categories: Array<CategoryModel>;

  public quizzes: Array<QuizModel>;

  private _subs: Array<Subscription> = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;
  form: FormGroup;

  public dataSource = new QuizDataSource<CategoryModel>(this._userService);

  constructor(
    private readonly _userService: UserRestApiService,
    private readonly  _categoryService: CategoryRestApiService,
    private readonly _quizService: QuizRestApiService,
    private readonly _fb: FormBuilder,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      categoryId: [null],
      quizId: [{ value: null, disabled: true }]
    });

    this._categoryService.getAll<CategoryModel>({
      additionalPath: 'list'
    }).toPromise().then(
      data => {
        this.categories = data.list;
        this.categories.unshift({
          id: null,
          name: '---'
        })
      }
    ).catch(error => this._store.dispatch(ToastrActions.SHOW_ERROR({ message: error })));

    this._subs.push(this.form.get('categoryId').valueChanges.subscribe(
      (data: number) => {
        if (!data) {
          this.quizzes = []
          this.form.get('quizId').disable();
        } else {
          this.form.controls['quizId'].setValue(null);
          this._quizService.getAll<QuizModel>({
            additionalPath: 'list',
            params: {
              category: data,
              title: null,
              questions: null
            }
          }).toPromise().then(
            quiz => {
              this.form.get('quizId').enable();
              this.quizzes = quiz.list;
              this.quizzes.unshift({
                id: null,
                title: '---'
              });
            }
          ).catch(error => this._store.dispatch(ToastrActions.SHOW_ERROR({ message: error })));
        }
      }
    ));

    this.dataSource.setPathAndLoad('ranking');
  }

  ngAfterViewInit() {
    this.dataSource.form = this.form;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sorter = this.matSort;
  }
}
