import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HasTokenGuard } from '../shared/guards/has-token.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'quiz',
        loadChildren: () => import('../quiz/quiz.module').then(m => m.QuizModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'quiz2',
        loadChildren: () => import('../quiz/quiz.module').then(m => m.QuizModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'quiz3',
        loadChildren: () => import('../quiz/quiz.module').then(m => m.QuizModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'category',
        loadChildren: () => import('../category/category.module').then(m => m.CategoryModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'rank',
        loadChildren: () => import('../rank/rank.module').then(m => m.RankModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
        canActivate: [HasTokenGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
