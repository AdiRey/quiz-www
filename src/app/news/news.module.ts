import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news.component';
import { NewsViewComponent } from './components/news-view/news-view.component';
import { SwiperModule } from 'swiper/angular';
import { StoreModule } from '@ngrx/store';
import { NewsEffect, newsReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [NewsComponent, NewsViewComponent],
  imports: [
    CommonModule,
    SwiperModule,
    NewsRoutingModule,
    SharedModule,
    StoreModule.forFeature('news', newsReducer),
    EffectsModule.forFeature([NewsEffect])
  ]
})
export class NewsModule { }
