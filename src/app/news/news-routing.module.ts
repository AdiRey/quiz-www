import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsViewComponent } from './components/news-view/news-view.component';
import { NewsComponent } from './components/news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: NewsViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
