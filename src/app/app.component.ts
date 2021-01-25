import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store/app-state';
import * as RootActions from '@shared/root-store/root.actions';
import { LocalStorage } from '@shared/service/local-storage.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(
    private readonly _store: Store<AppState>
  ) {
    this._store.dispatch(RootActions.SET_USER(LocalStorage.getUserData()));
  }
}
