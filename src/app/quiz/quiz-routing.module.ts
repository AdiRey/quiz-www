import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizCompletingComponent } from './components/quiz-completing/quiz-completing.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizPreviewComponent } from './components/quiz-preview/quiz-preview.component';
import { QuizTableComponent } from './components/quiz-table/quiz-table.component';
import { QuizComponent } from './components/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
      },
      {
        path: 'table',
        component: QuizTableComponent
      },
      {
        path: 'add-quiz',
        component: QuizFormComponent
      },
      {
        path: 'edit-quiz/:quizId',
        component: QuizFormComponent
      },
      {
        path: 'preview/:quizId',
        component: QuizPreviewComponent
      },
      {
        path: 'completing/:quizId',
        component: QuizCompletingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
