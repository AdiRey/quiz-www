import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryRestApiService } from 'src/app/shared/api-service/category/category.service';
import { ConfirmEntryComponent } from 'src/app/shared/components/confirm-entry/confirm-entry.component';
import { CategoryModel } from 'src/app/shared/model/category.model';
import { QuizDataSource } from 'src/app/shared/quiz-table.datasource';
import { CategoryFormComponent } from '../category-form/category-form.component';
import * as CategoryActions from '../../store/category.actions';

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
    this._matDialog.open(CategoryFormComponent, {
      minHeight: '500px',
      minWidth: '700px'
    });
  }

  public edit(element: any) {
    this._matDialog.open(CategoryFormComponent, {
      minWidth: '700px',
      data: element
    })
  }

  public delete(element: any) {
    this._matDialog.open(ConfirmEntryComponent,{
      minWidth: '700px',
      minHeight: '500px',
      data: {
        message: 'Czy na pewno chcesz usunąć tą kategorię?',
        element: element,
        key: 'delete',
        actions: {
          delete: CategoryActions.DELETE_CATEGORY
        }
      }
    })
  }

}
