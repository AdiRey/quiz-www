import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NewsModel } from '@shared/model/news.model';
import { AppState } from '@shared/store/app-state';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper/core';
import { selectNewsData, selectNewsLoading } from '../../store';
import * as NewsActions from '../../store/news.actions';

SwiperCore.use([Virtual, Pagination, Navigation]);

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {

  public pagination = {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 2
  }

  public navigation = {
    nextEl: '.swiper-button-next',
    revEl: '.swiper-button-prev'
  };

  public defaultImage: string = '../../../../assets/images/quiz-default.jpg';

  public news$: Observable<Array<NewsModel>> = this._store.select(selectNewsData).pipe(filter(f => f != null));
  public loading$: Observable<boolean> = this._store.select(selectNewsLoading);

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this._store.dispatch(NewsActions.LOAD_CATEGORIES());
  }

  goToQuiz(quizId: number) {
    this._router.navigate([`/q/quiz/preview/${quizId}`]);
  }

}
