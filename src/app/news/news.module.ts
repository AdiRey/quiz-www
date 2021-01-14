import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news.component';
import { NewsViewComponent } from './components/news-view/news-view.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [NewsComponent, NewsViewComponent],
  imports: [
    CommonModule,
    SwiperModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
