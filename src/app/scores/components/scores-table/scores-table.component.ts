import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { CategoryRestApiService } from '@shared/api-service/category.service';
import { UserRestApiService } from '@shared/api-service/user.service';
import { CategoryModel } from '@shared/model/category.model';
import { ScoresModel } from '@shared/model/scores.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import { AppState } from '@shared/store/app-state';
import * as ToastrActions from '@shared/store/toast/toastr.actions';

@Component({
  selector: 'app-scores-table',
  templateUrl: './scores-table.component.html',
  styleUrls: ['./scores-table.component.scss']
})
export class ScoresTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  public columns: Array<string> = ['lp', 'title', 'createDate', 'result', 'percentage'];
  public categories: Array<CategoryModel>;
  public dataSource = new QuizDataSource<ScoresModel>(this._userService);
  public form: FormGroup;

  constructor(
    private readonly _categoryService: CategoryRestApiService,
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder,
    private readonly _userService: UserRestApiService
  ) { }

  ngOnInit(): void {
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

    this.form = this._formBuilder.group({
      categoryId: [null]
    });
    this.dataSource.setPathAndLoad('quiz-results');
  }

  ngAfterViewInit(): void {
    this.dataSource.form = this.form;
    this.dataSource.sorter = this.matSort;
    this.dataSource.paginator = this.paginator;
  }

}
