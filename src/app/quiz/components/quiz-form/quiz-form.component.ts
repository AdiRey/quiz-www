import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuizMapperSerivce } from '@shared/service/quiz-mapper.service';
import { AppState } from '@shared/store/app-state';
import * as QuizActions from '../../store/quiz.actions';
import { QuizModel } from '../../../shared/model/quiz.model';
import { CategoryRestApiService } from '@shared/api-service/category.service';
import { CategoryModel } from '@shared/model/category.model';
import * as ToastrActions from '@shared/store/toast/toastr.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { selectQuizEditData, selectQuizLoading } from '../../store';
import { filter } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmEntryComponent } from '@shared/components/confirm-entry/confirm-entry.component';
import { ActionType, ConfirmModel } from '@shared/model/components/confirm-entry.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true, displayDefaultIndicatorType: false }}
  ]
})
export class QuizFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public minDate = new Date();
  public categories: Array<CategoryModel>;

  private _subs: Array<Subscription> = [];

  public loading$ : Observable<boolean> = this._store.select(selectQuizLoading);

  public readonly isEdit: boolean = this._router.url.includes('edit-quiz');
  public isLoaded: boolean = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<AppState>,
    private readonly _categoryService: CategoryRestApiService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _matDialog: MatDialog
    ) {}


  ngOnInit() {
    this._categoryService.getAll<CategoryModel>({
      additionalPath: 'list'
    }).toPromise().then(
      data => this.categories = data.list
    ).catch(error => this._store.dispatch(ToastrActions.SHOW_ERROR({ message: error })));

    this.form = this._formBuilder.group({
      basic: this._formBuilder.group({
        title: [null, Validators.required],
        category: this._formBuilder.group({
          id: [null, Validators.required]
        }),
        description: [null],
        time: [null, [Validators.min(0)]],
        isInfinity: [true],
        approachesCount: [null, Validators.min(1)],
        startDate: [null, Validators.required],
        endingDate: [null, Validators.required],
      }),
      image: [null],
      questions: this._formBuilder.array([])
    });

    if (this.isEdit) {
      this._store.dispatch(QuizActions.LOAD_QUIZ({ id: this._activatedRoute.snapshot.paramMap.get('quizId') }));
      this._subs.push(this._store.select(selectQuizEditData).pipe(filter(f => f != null)).subscribe(
        data => {
          this._setter(data);
          this.form.patchValue(QuizMapperSerivce.fromOutputToFormFormat(data));
          this._cdr.detectChanges();
          this.isLoaded = true;
        }
      ));
    }
  }

  public getEndMinDate() {
    return this.form.controls['basic'].get('startDate').value || this.minDate;
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
    this._store.dispatch(QuizActions.CLEAR_EDIT_DATA());
  }

  private _setter(quiz: QuizModel) {
    for (let prop in quiz) {
      if (Array.isArray(quiz[prop])) {
        quiz[prop].forEach(question => {
          const formQuestion = this.questionForm;
          question['answers'].forEach(() => (formQuestion.get('answers') as FormArray).push(this.answerForm));
          (this.form.get(prop) as FormArray).push(formQuestion);
        });
      }
    }
  }

  get questionForm() {
    return this._formBuilder.group({
      content: [null, Validators.required],
      image: [null],
      pointsCount: [null, [Validators.required, Validators.min(1)]],
      type: [null, [Validators.required]],
      answers: this._formBuilder.array([]),
      correctRadio: [null]
    });
  }

  get answerForm() {
    return this._formBuilder.group({
      content: [null, [Validators.required]],
      correct: [null]
    });
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  public answers(index: number): FormArray {
    return this.questions.controls[index].get('answers') as FormArray;
  }

  get options() {
    return this._options;
  }

  public change(img: any, name: string) {
    if (img.files && img.files[0]) {
      const reader = new FileReader();
      const self = this;
      reader.addEventListener("load", function() {
        document.getElementById(name)['src'] = reader.result;
        if (name.startsWith('q')) {
          (self.form.get('questions') as FormArray).controls[Number(name.substring(1))].get('image').setValue(reader.result);
        } else {
          self.form.get('image').setValue(reader.result);
        }
      }, false);

      reader.readAsDataURL(img.files[0]);
    }
  }

  public clearImage(name: string) {
    document.getElementById(name)['src'] = null;
    if (name.startsWith('q')) {
      (this.form.get('questions') as FormArray).controls[Number(name.substring(1))].get('image').setValue(null);
    } else {
      this.form.get('image').setValue(null);
    }
  }

  public setImg(hook: string) {
    let interval; // TODO think about deleting interval
    if (hook.startsWith('q') && (this.form.get('questions') as FormArray).controls[Number(hook.substring(1))].get('image').value) {
      interval = setInterval(() => {
        if (document.getElementById(hook)) {
          document.getElementById(hook).setAttribute('src', (this.form.get('questions') as FormArray).controls[Number(hook.substring(1))].get('image').value);
          clearInterval(interval);
        }
      });
    } else if (hook === 'img' && this.form.get('image').value) {
      interval = setInterval(() => {
        if (document.getElementById(hook)) {
          document.getElementById(hook).setAttribute('src', this.form.get('image').value);
          clearInterval(interval);
        }
      })
    }
  }

  public addQuestion() {
    this.questions.push(this.questionForm);
  }

  public addAnswer(index: number) {
    (this.questions.controls[index].get('answers') as FormArray).push(this.answerForm);
  }

  public deleteQuestion(questionId: number) { 
    this.questions.controls.splice(questionId, 1);
  }

  public deleteAnswer(questionId: number, answerId: number) { 
    (this.questions.controls[questionId].get('answers') as FormArray).controls.splice(answerId, 1);
  }

  public save() {
    const action = this.isEdit ? QuizActions.EDIT_QUIZ : QuizActions.SAVE_QUIZ;
    const message = 'Czy na pewno chcesz ' + (this.isEdit? 'zapisać' : 'edytować') + ' quiz?'
    this._matDialog.open<ConfirmEntryComponent, ConfirmModel<QuizModel, QuizModel>>(ConfirmEntryComponent, {
      width: '750px',
      height: '230px',
      data: {
        actionType: ActionType.SAVE,
        action: action,
        element: QuizMapperSerivce.fromFormToOutputFormat<QuizModel>(this.form.value),
        loadingSelector: selectQuizLoading,
        message: message
      }
    });
  }

  public cancel() {
    this._matDialog.open<ConfirmEntryComponent, Partial<ConfirmModel<QuizModel, any>>>(ConfirmEntryComponent, {
      width: '750px',
      height: '280px',
      data: {
        actionType: ActionType.CONFIRM,
        message: 'Czy na pewno chcesz anulować tworzenie quizu? Pamiętaj, że wszelkie ustawienia bezpowrtownie przepadną.'
      }
    }).afterClosed().toPromise().then(data => {
      if (data === 'confirm') {
        this._router.navigate(['/q/quiz']);
      }
    })
  }


  private readonly _options = [
    { label: 'Jednokrotnego wyboru', value: 'RADIO' },
    { label: 'Wielokrotnego wyboru', value: 'CHECKBOX' }
  ];
}
