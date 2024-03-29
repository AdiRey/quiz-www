import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankTableComponent } from './components/rank-table/rank-table.component';
import { RankComponent } from './components/rank.component';

const routes: Routes = [
  {
    path: '',
    component: RankComponent,
    children: [
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
      },
      {
        path: 'table',
        component: RankTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankRoutingModule { }
