import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartModel } from '@shared/model/dashboard.model';
import { AppState } from '@shared/store/app-state';
import { combineLatest, merge, Observable, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { selectActiveCount, selectCategoryCount, selectCategoryQuizCount, selectCategoryQuizLoading, selectChart, selectCountTileLoadingBoolean, selectCountTileLoadingNumber, selectLoadingChart, selectQuizCount, selectUserCount } from '../store';
import * as DashboardActions from '../store/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _subs: Array<Subscription> = [];

  public loadingTiles$: Observable<boolean> = this._store.select(selectCountTileLoadingBoolean).pipe();

  public loadingTilesNumber$: Observable<number> = this._store.select(selectCountTileLoadingNumber);

  public loadingChart$: Observable<boolean> = this._store.select(selectLoadingChart);

  public loadingCategories$ = this._store.select(selectCategoryQuizLoading);

  public loaded: boolean = false;

  public categories$ = this._store.select(selectCategoryQuizCount).pipe(
    filter(f => f != null),
    map(data => {
      return data.content.map(x => {
        return {
          name: x.name,
          value: x['countQuizzes']
        }
      })
    })
  );
  
  public tiles: Array<ChartModel> = [];

  public chart = {
    xAxis: 'Dni tygodnia',
    yAxis: 'Liczba aktywnych użytkowników',
    data: []
  }

  constructor(
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this._store.dispatch(DashboardActions.LOAD_TILES({ count: 4 }));
    this._store.dispatch(DashboardActions.LOAD_CHART());
    this._store.dispatch(DashboardActions.LOAD_CATEGORIES_COUNT());
    this._subs.push(merge(
      this._store.pipe(select(selectCategoryCount)),
      this._store.pipe(select(selectUserCount)),
      this._store.pipe(select(selectQuizCount)),
      this._store.pipe(select(selectActiveCount))
    ).pipe(filter(f => f != null)).subscribe(data => {
      this.tiles.push(data);
    }));
    this.chart.data = this._getLastWeek();
    this._subs.push(this._store.select(selectChart).pipe(filter(f => f != null)).subscribe(
      data => {
        this.chart.data = this.chart.data.map(
          day => {
            let temp = data.content.filter(f => this._getDayPl(new Date(f.name).getDay()) === day.name);
            if (temp.length) {
              return {
                name: day.name,
                value: temp[0].value
              }
            }
            return day;
          }
        )
        this.chart.data = this.chart.data.reverse();
        this.loaded = true;
      }
    ));
  }

  ngOnDestroy(): void {
    this._store.dispatch(DashboardActions.CLEAR_CHART());
    this._store.dispatch(DashboardActions.CLEAR_TILES());
    this._subs.forEach(sub => sub.unsubscribe());
  }

  private _getDayPl(day: number) {
    switch(day) {
      case 0:
        return 'Niedziela'
      case 1:
        return 'Poniedziałek'
      case 2:
        return 'Wtorek'
      case 3:
        return 'Środa'
      case 4:
        return 'Czwartek'
      case 5:
        return 'Piątek'
      case 6:
        return 'Sobota'
    }
  }

  private _getLastWeek() {
    let days = [];
    for (let i = 1; i < 8; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        id: 1,
        name: this._getDayPl(date.getDay()),
        value: i // 0
      });
    }
    return days;
  }

  bestCategories = [
    {
      name: 'Angular',
      value: 1000
    },
    {
      name: 'Spring',
      value: 612
    },
    {
      name: 'Ruby on Rails',
      value: 107
    },
    {
      name: 'Symphony',
      value: 312
    },
    {
      name: 'Inne',
      value: 512
    }
  ]

}
