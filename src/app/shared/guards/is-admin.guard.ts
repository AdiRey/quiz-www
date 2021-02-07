import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LocalStorage } from '../service/local-storage.service';

@Injectable()
export class IsAdminGuard implements CanActivate {

  canActivate() {
    return LocalStorage.getUserData().isAdmin
  }
  
}
