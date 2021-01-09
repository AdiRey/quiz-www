import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtTokenHelper } from '../service/jwt-token-helper.service';
import { LocalStorage } from '../service/local-storage.service';

@Injectable()
export class HasTokenGuard implements CanActivate {

  constructor(
    private readonly _jwtSerivce: JwtTokenHelper,
    private readonly _router: Router
  ) {}

  canActivate() {
    const token = LocalStorage.getToken();
    if (!!token && this._jwtSerivce.isTokenExpired(token)) {
      this._router.navigate(['/auth']);
      LocalStorage.clearAuth();
      return false;
    }
    return true;
  }
  
}
