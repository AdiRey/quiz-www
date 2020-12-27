import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankRoutingModule } from './rank-routing.module';
import { RankComponent } from './rank.component';


@NgModule({
  declarations: [RankComponent],
  imports: [
    CommonModule,
    RankRoutingModule
  ]
})
export class RankModule { }
