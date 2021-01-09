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

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit, AfterViewInit {

  public columns: Array<string> = ['lp', 'name', 'id', 'createDate', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  public dataSource = new QuizDataSource<CategoryModel>(this._categoryService);

  constructor(
    private readonly _categoryService: CategoryRestApiService,
    private readonly _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sorter = this.matSort;
  }
  
  public openCreateDialog() {
    this._matDialog.open<CategoryFormComponent, CategoryEditModel>(CategoryFormComponent, {
      minHeight: '500px',
      minWidth: '700px',
      data: {
        isEdit: false
      }
    });
  }

  public edit(element: CategoryModel) {
    this._matDialog.open<CategoryFormComponent, CategoryEditModel>(CategoryFormComponent, {
      minWidth: '700px',
      data: {
        isEdit: true,
        content: element
      }
    })
  }

  public delete(element: CategoryModel) {
    this._matDialog.open<ConfirmEntryComponent, ConfirmModel<any, IdModel>>(ConfirmEntryComponent,{
      data: {
        message: 'Czy na pewno chcesz usunąć tą kategorię?',
        element: element,
        action: CategoryActions.DELETE_CATEGORY,
        loadingSelector: selectLoading
      }
    })
  }
}
