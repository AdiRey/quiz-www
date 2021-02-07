import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderService } from '@shared/service/header.service';
import { LocalStorage } from '@shared/service/local-storage.service';
import { AppState } from '@shared/store/app-state';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skip, tap } from 'rxjs/operators';
import * as RootActions from '@shared/root-store/root.actions';
import { selectRootUser } from '@shared/root-store/root.selectors';
import { UserModel } from '@shared/model/root.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public opened: boolean = true;

  public header$ = this._headerService.getAction();

  public user$ = this._store.select(selectRootUser).pipe(filter(f => f != null));

  public currentLink$: Observable<string>;
  public itemsObj = {};
  public active;

  public items = [
    {
      route: '/q/dashboard',
      content: 'strona główna',
      icon: 'video_label',
      adminOnly: false
    },
    {
      route: '/q/news',
      content: 'nowe',
      icon: 'fiber_new',
      adminOnly: false
    },
    {
      route: '/q/quiz',
      content: 'quizy',
      icon: 'school',
      adminOnly: false
    },
    {
      route: '/q/scores',
      content: 'wyniki',
      icon: 'score',
      adminOnly: false
    },
    {
      route: '/q/rank',
      content: 'rankingi',
      icon: 'moving',
      adminOnly: false
    },
    {
      route: '/q/category',
      content: 'kategorie',
      icon: 'category',
      adminOnly: true
    },
    {
      route: '/q/admin-panel',
      content: 'administracja',
      icon: 'admin_panel_settings',
      adminOnly: true
    }
  ];

  constructor(
    private readonly _router: Router,
    private readonly _headerService: HeaderService,
    private readonly _store: Store<AppState>
  ) {
    for (let i of this.items) {
      this.itemsObj[i.route] = { content: i.content, icon: i.icon };
    }
    this._router.events.pipe(
      filter(f => f instanceof NavigationEnd),
      distinctUntilChanged((prev: NavigationEnd, next: NavigationEnd) => prev.url === next.url ),
      tap(() => this._headerService.setAction(null)),
      tap(data => this.active = this.itemsObj[Object.keys(this.itemsObj).filter(key => data.url.startsWith(key))[0]])
    ).subscribe();
  }

  ngOnInit(): void {
    const isAdmin = LocalStorage.getUserData().isAdmin;
    if (!isAdmin) {
      this.items = this.items.filter(item => !item.adminOnly);
    }
  }

  public logout() {
    this._store.dispatch(RootActions.CLEAR_USER());
    LocalStorage.clearAuth();
    this._router.navigate(['/auth']);
  }

  public windowEvent() {
    window.dispatchEvent(new Event('resize'));
  }

}
