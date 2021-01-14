import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizIntermediateComponent } from './components/quiz-intermediate/quiz-intermediate.component';
import { QuizViewsComponent } from './components/quiz-table/quiz-table.component';
import { QuizComponent } from './components/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
    children: [
      {
        path: '',
        redirectTo: 'views',
        pathMatch: 'full'
      },
      {
        path: 'views',
        component: QuizViewsComponent
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
        path: 'intermediate/:quizId',
        component: QuizIntermediateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
