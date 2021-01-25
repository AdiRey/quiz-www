import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChartModel } from '@shared/model/dashboard.model';
import { AppState } from '@shared/store/app-state';
import { combineLatest, merge, Observable, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { selectActiveCount, selectCategoryCount, selectChart, selectCountTileLoadingBoolean, selectCountTileLoadingNumber, selectLoadingChart, selectQuizCount, selectUserCount } from '../store';
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

  public loaded: boolean = false;
  
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
    this._subs.push(merge(
      this._store.pipe(select(selectCategoryCount)),
      this._store.pipe(select(selectUserCount)),
      this._store.pipe(select(selectQuizCount)),
      this._store.pipe(select(selectActiveCount))
    ).pipe(filter(f => f != null)).subscribe(data => {
      this.tiles.push(data);
    }));
    this._subs.push(this._store.select(selectChart).pipe(filter(f => f != null)).subscribe(
      data => {
        this.chart.data = data.content.map(value => {
          console.log(this._getDayPl(new Date(value.name).getDay()));
          return {
            id: value.id,
            name: this._getDayPl(new Date(value.name).getDay()),
            value: value.value 
          }
        });
        this.chart.data = this.chart.data.reverse();
        this.loaded = true;
      }
    ));

    setTimeout(() => console.log(this.tiles),5000);
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
