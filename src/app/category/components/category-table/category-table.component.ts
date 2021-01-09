import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryRestApiService } from '@shared/api-service/category/category.service';
import { ConfirmEntryComponent } from '@shared/components/confirm-entry/confirm-entry.component';
import { CategoryEditModel, CategoryModel } from '@shared/model/category.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import { CategoryFormComponent } from '../category-form/category-form.component';
import * as CategoryActions from '../../store/category.actions';
import { ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { IdModel } from '@shared/model/components/id.model';
import { selectLoading } from '../../store/category.selector';
import { HeaderService } from '@shared/service/header.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit, AfterViewInit {

  public columns: Array<string> = ['lp', 'name', 'createDate', 'countQuizzes', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  public dataSource = new QuizDataSource<CategoryModel>(this._categoryService);

  constructor(
    private readonly _categoryService: CategoryRestApiService,
    private readonly _matDialog: MatDialog,
    private readonly _headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.dataSource.loadData();
    this._headerService.setAction({
      text: 'Dodaj kategorię',
      icon: 'add',
      action: () => this._matDialog.open<CategoryFormComponent, CategoryEditModel>(CategoryFormComponent, {
        minWidth: '700px',
        data: {
          isEdit: false
        }
      }).afterClosed().pipe(tap(() => this.dataSource.loadData())).subscribe()
    });
  }

  ngAfterViewInit() {
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
    }).afterClosed().pipe(tap(() => this.dataSource.loadData())).subscribe();
  }

  public delete(element: CategoryModel) {
    this._matDialog.open<ConfirmEntryComponent, ConfirmModel<any, IdModel>>(ConfirmEntryComponent,{
      data: {
        message: 'Czy na pewno chcesz usunąć tą kategorię?',
        element: element,
        action: CategoryActions.DELETE_CATEGORY,
        loadingSelector: selectLoading
      }
    }).afterClosed().pipe(tap(() => this.dataSource.loadData())).subscribe();
  }
}
