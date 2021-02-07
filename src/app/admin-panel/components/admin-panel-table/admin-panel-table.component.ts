import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { UserRestApiService } from '@shared/api-service/user.service';
import { AdminPanelModel } from '@shared/model/admin-panel.model';
import { QuizDataSource } from '@shared/quiz-table.datasource';
import { AppState } from '@shared/store/app-state';
import * as ToastrActions from '@shared/store/toast/toastr.actions';

@Component({
  selector: 'app-admin-panel-table',
  templateUrl: './admin-panel-table.component.html',
  styleUrls: ['./admin-panel-table.component.scss']
})
export class AdminPanelTableComponent implements OnInit, AfterViewInit {

  public columns: Array<string> = ['lp', 'firstName', 'lastName', 'createDate', 'hasAccess', 'isAdmin'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  public form: FormGroup;

  public dataSource = new QuizDataSource<AdminPanelModel>(this._userService);

  constructor(
    private readonly _userService: UserRestApiService,
    private readonly _store: Store<AppState>,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      firstName: [null],
      lastName: [null]
    });
    this.dataSource.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.form = this.form;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sorter = this.matSort;
  }

  public changeHasAccess(element: AdminPanelModel, access: boolean) {
    this._userService.update({
      additionalPath: `${element.id}/change-has-access?hasAccess=${access}`
    }).toPromise()
      .then(() => this._store.dispatch(ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie zmodyfikowano uprawnienia' })))
      .catch(error => this._store.dispatch(ToastrActions.SHOW_ERROR({ message: error })));
  }

  public changeIsAdmin(element: AdminPanelModel, isAdmin: boolean) {
    this._userService.update({
      additionalPath: `${element.id}/change-is-admin?isAdmin=${isAdmin}`
    }).toPromise()
      .then(() => this._store.dispatch(ToastrActions.SHOW_SUCCESS({ message: 'Pomyślnie zmodyfikowano status użytkownika' })))
      .catch(error => this._store.dispatch(ToastrActions.SHOW_ERROR({ message: error })));
  }
  
}
