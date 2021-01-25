import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryRestApiService } from '@shared/api-service/category.service';
import { ConfirmEntryComponent } from '@shared/components/confirm-entry/confirm-entry.component';
import { CategoryEditModel, CategoryModel } from '@shared/model/category.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import { CategoryFormComponent } from '../category-form/category-form.component';
import * as CategoryActions from '../../store/category.actions';
import { ActionType, ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { IdModel } from '@shared/model/components/id.model';
import { selectLoading } from '../../store/category.selector';
import { HeaderService } from '@shared/service/header.service';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit, AfterViewInit {

  public columns: Array<string> = ['lp', 'name', 'id', 'createDate', 'countQuizzes', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  public form: FormGroup;

  public dataSource = new QuizDataSource<CategoryModel>(this._categoryService);

  constructor(
    private readonly _categoryService: CategoryRestApiService,
    private readonly _matDialog: MatDialog,
    private readonly _headerService: HeaderService,
    private readonly _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [null]
    });
    this._headerService.setAction({
      text: 'Dodaj kategorię',
      icon: 'add',
      action: () => this._matDialog.open<CategoryFormComponent, CategoryEditModel>(CategoryFormComponent, {
        minWidth: '700px',
        data: {
          isEdit: false
        }
      }).afterClosed().toPromise().then(data => {
        if (data != null) {
          this.dataSource.loadData();
        }
      })
    });
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.form = this.form;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sorter = this.matSort;
  }

  public edit(element: CategoryModel) {
    this._matDialog.open<CategoryFormComponent, CategoryEditModel>(CategoryFormComponent, {
      minWidth: '700px',
      data: {
        isEdit: true,
        content: element
      }
    }).afterClosed().toPromise().then(data => {
      if (data != null) {
        this.dataSource.loadData();
      }
    })
  }

  public delete(element: CategoryModel) {
    this._matDialog.open<ConfirmEntryComponent, ConfirmModel<CategoryModel, IdModel>>(ConfirmEntryComponent,{
      data: {
        message: 'Czy na pewno chcesz usunąć tą kategorię?',
        element: element,
        action: CategoryActions.DELETE_CATEGORY,
        actionType: ActionType.DELETE,
        loadingSelector: selectLoading
      }
    }).afterClosed().toPromise().then(data => {
      if (data != null) {
        this.dataSource.loadData();
      }
    });
  }
}
