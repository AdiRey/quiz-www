import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryRestApiService } from '@shared/api-service/category.service';
import { ConfirmEntryComponent } from '@shared/components/confirm-entry/confirm-entry.component';
import { CategoryModel, CategoryEditModel } from '@shared/model/category.model';
import { ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { IdModel } from '@shared/model/components/id.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import { HeaderService } from '@shared/service/header.service';
import { tap } from 'rxjs/operators';
import { selectLoading } from 'src/app/auth/store';
import { CategoryFormComponent } from 'src/app/category/components/category-form/category-form.component';

@Component({
  selector: 'app-rank-table',
  templateUrl: './rank-table.component.html',
  styleUrls: ['./rank-table.component.scss']
})
export class RankTableComponent implements OnInit {

  public columns: Array<string> = ['lp', 'name', 'id', 'createDate', 'countQuizzes', 'actions'];

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
    // this._matDialog.open<ConfirmEntryComponent, ConfirmModel<CategoryModel, IdModel>>(ConfirmEntryComponent,{
    //   data: {
    //     message: 'Czy na pewno chcesz usunąć tą kategorię?',
    //     element: element,
    //     action: CategoryActions.DELETE_CATEGORY,
    //     loadingSelector: selectLoading
    //   }
    // }
  }
}
