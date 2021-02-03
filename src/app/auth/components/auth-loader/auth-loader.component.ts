import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store/app-state';
import { selectLoading } from '../../store';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-auth-loader',
  templateUrl: './auth-loader.component.html',
  styleUrls: ['./auth-loader.component.scss']
})
export class AuthLoaderComponent implements OnInit {

  public loading$ = this._store.select(selectLoading);

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._store.dispatch(AuthActions.LOAD_TOKEN({
      uuid: this._activatedRoute.snapshot.queryParamMap.get('uuid')
    }));
  }
}
