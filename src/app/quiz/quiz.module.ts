import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './components/quiz.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizTableComponent } from './components/quiz-table/quiz-table.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperIntl, MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE  } from '@angular/material/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { StoreModule } from '@ngrx/store';
import { QuizEffect, quizReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { QuizPreviewComponent } from './components/quiz-preview/quiz-preview.component';
import { QuizCompletingComponent } from './components/quiz-completing/quiz-completing.component';


function getStepperIntl() {
  let stepper = new MatStepperIntl();
  stepper.optionalLabel = 'Opcjonalne';
  return stepper;
}

@NgModule({
  declarations: [QuizComponent, QuizFormComponent, QuizTableComponent, QuizPreviewComponent, QuizCompletingComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatNativeDateModule,
    StoreModule.forFeature('quiz', quizReducer),
    EffectsModule.forFeature([QuizEffect])
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: MatStepperIntl,
      useFactory: () => getStepperIntl()
    }
  ]
})
export class QuizModule { }
