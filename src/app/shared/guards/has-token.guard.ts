import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtTokenHelper } from '../service/jwt-token-helper.service';

@Injectable({
  providedIn: 'root'
})
export class HasTokenGuard implements CanActivate {

  constructor(
    private readonly _jwtSerivce: JwtTokenHelper,
    private readonly _router: Router
  ) {}

  canActivate() {
    const token = localStorage.getItem('jwt-token');
    if (!!token && this._jwtSerivce.isTokenExpired(token)) {
      this._router.navigate(['/auth']);
      return false;
    }
    return true;
  }
  
}
