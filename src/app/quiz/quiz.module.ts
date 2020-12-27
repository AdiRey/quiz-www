import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './components/quiz.component';
import { SwiperModule } from 'swiper/angular';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizViewsComponent } from './components/quiz-views/quiz-views.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [QuizComponent, QuizFormComponent, QuizViewsComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SwiperModule,
    SharedModule,
    MatButtonModule
  ]
})
export class QuizModule { }
