import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/shared/store/app-state';
import { MessageContainerComponent } from '../../shared/components/message-container/message-container.component';
import * as AuthActions from '../store/auth.actions';
import { selectUrl } from '../store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  public _url: string;

  constructor(
    private readonly  _matDialog: MatDialog,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this._store.dispatch(AuthActions.LOAD_CAS_URL());
    this._subscription = this._store.select(selectUrl).pipe(filter(f => f != null)).subscribe(
      url => this._url = url
    )
  }

  openDialog(contentType: string): void {
    console.log(contentType);
    this._matDialog.open(MessageContainerComponent, {
      maxWidth: '1000px',
      maxHeight: '700px',
      data: {
        contentType: contentType,
        url: 'http://localhost:4200/assets/content/content.json'
      }
    });
  }

  loginRoute(): void {
    window.location.href = this._url
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
