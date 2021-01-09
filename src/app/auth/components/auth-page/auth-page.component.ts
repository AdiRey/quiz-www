import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MessageContainerComponent } from 'src/app/shared/components/message-container/message-container.component';
import { AppState } from 'src/app/shared/store/app-state';
import { selectLoading, selectUrl } from '../../store';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  private _subscription: Subscription;
  public url: string;
  public loading$: Observable<boolean> = this._store.select(selectLoading);
  public click: boolean = false;

  constructor(
    private readonly  _matDialog: MatDialog,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this._store.dispatch(AuthActions.LOAD_CAS_URL());
    this._subscription = this._store.select(selectUrl).pipe(filter(f => f != null)).subscribe(
      url => this.url = url
    )
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
    const interval = setInterval(() => {
      if (this.url) {
        clearInterval(interval);
        window.location.href = this.url;
        this.click = false;
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
