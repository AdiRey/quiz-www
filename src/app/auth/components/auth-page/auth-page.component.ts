import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MessageContainerComponent } from '@shared/components/message-container/message-container.component';
import { AppState } from '@shared/store/app-state';
import { selectError, selectLoading, selectUrl } from '../../store';
import * as AuthActions from '../../store/auth.actions';
import { selectRootUser } from '@shared/root-store/root.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  private _subscription: Subscription;
  private _interval = null;
  private _error: boolean = false;

  public url: string;
  public loading$: Observable<boolean> = this._store.select(selectLoading);
  public error$: Observable<boolean> = this._store.select(selectError);
  public click: boolean = false;

  public user$ = this._store.select(selectRootUser);

  constructor(
    private readonly  _matDialog: MatDialog,
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this._store.dispatch(AuthActions.LOAD_CAS_URL());
    this._subscription = this._store.select(selectUrl).pipe(filter(f => f != null)).subscribe(
      url => this.url = url
    );
    this._subscription.add(this.loading$.pipe(filter(f => !f)).subscribe(() => this.click = false));
    this._subscription.add(this.error$.subscribe(error => this._error = error))
  }

  openDialog(contentType: string): void {
    this._matDialog.open(MessageContainerComponent, {
      maxWidth: '1000px',
      maxHeight: '700px',
      data: {
        contentType: contentType,
        url: `${window.location.protocol}//${window.location.host}/assets/content/content.json`
      }
    });
  }

  loginRoute(): void {
    this.click = true;
    this._loadUrl();
    this._interval = setInterval(() => {
      if (this.url) {
        this._route();
      }
    }, 100);
  }

  private _loadUrl() {
    if (this._error) {
      this._store.dispatch(AuthActions.LOAD_CAS_URL());
    }
  }

  private _route() {
    if (this._interval) {
      clearInterval(this._interval);
    }
    this._interval = null;
    window.location.href = this.url;
  }

  public goToDashboard() {
    this._router.navigate(['/q']);
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
