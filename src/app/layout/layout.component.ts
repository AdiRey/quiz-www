import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { HeaderService } from '@shared/service/header.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skip, tap } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public opened: boolean = true;

  public header$ = this._headerService.getAction();

  public currentLink$: Observable<string>;
  public itemsObj = {};

  public items = [
    {
      route: '/q/dashboard',
      content: 'strona główna',
      icon: 'video_label'
    },
    {
      route: '/q/news',
      content: 'nowe',
      icon: 'fiber_new'
    },
    {
      route: '/q/quiz',
      content: 'quizy',
      icon: 'school'
    },
    {
      route: '/q/scores',
      content: 'wyniki',
      icon: 'score'
    },
    {
      route: '/q/rank',
      content: 'rankingi',
      icon: 'moving'
    },
    {
      route: '/q/category',
      content: 'kategorie',
      icon: 'category'
    }
  ];

  constructor(
    private readonly _router: Router,
    private readonly _headerService: HeaderService
  ) {
    this._router.events.pipe(
      filter(f => f instanceof NavigationEnd),
      distinctUntilChanged((prev: NavigationEnd, next: NavigationEnd) => prev.url === next.url ),
      tap(() => this._headerService.setAction(null)),
    ).subscribe();
  }

  ngOnInit(): void {
    for (let i of this.items) {
      this.itemsObj[i.route] = { content: i.content, icon: i.icon };
    }
  }

}
