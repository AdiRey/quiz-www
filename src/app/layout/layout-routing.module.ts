import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAdminGuard } from '@shared/guards/is-admin.guard';
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
        path: 'news',
        loadChildren: () => import('../news/news.module').then(m => m.NewsModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'quiz',
        loadChildren: () => import('../quiz/quiz.module').then(m => m.QuizModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'scores',
        loadChildren: () => import('../scores/scores.module').then(m => m.ScoresModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'category',
        loadChildren: () => import('../category/category.module').then(m => m.CategoryModule),
        canActivate: [HasTokenGuard, IsAdminGuard]
      },
      {
        path: 'rank',
        loadChildren: () => import('../rank/rank.module').then(m => m.RankModule),
        canActivate: [HasTokenGuard]
      },
      {
        path: 'admin-panel',
        loadChildren: () => import('../admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
        canActivate: [HasTokenGuard, IsAdminGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
