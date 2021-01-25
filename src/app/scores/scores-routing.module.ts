import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScoresTableComponent } from './components/scores-table/scores-table.component';
import { ScoresComponent } from './components/scores.component';

const routes: Routes = [
  {
    path: '',
    component: ScoresComponent,
    children: [
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
      },
      {
        path: 'table',
        component: ScoresTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoresRoutingModule { }
