import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@shared/store/app-state';
import { JwtTokenHelper } from '../service/jwt-token-helper.service';
import { LocalStorage } from '../service/local-storage.service';
import * as RootActions from '@shared/root-store/root.actions';

@Injectable()
export class HasTokenGuard implements CanActivate {

  constructor(
    private readonly _jwtSerivce: JwtTokenHelper,
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  canActivate() {
    const token = LocalStorage.getToken();
    if (!token || this._jwtSerivce.isTokenExpired(token)) {
      this._store.dispatch(RootActions.CLEAR_USER());
      this._router.navigate(['/auth']);
      LocalStorage.clearAuth();
      return false;
    }
    return true;
  }
  
}
