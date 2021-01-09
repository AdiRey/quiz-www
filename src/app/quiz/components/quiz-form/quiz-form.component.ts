import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { QuizMapperSerivce } from 'src/app/shared/service/quiz-mapper.service';
import { AppState } from 'src/app/shared/store/app-state';
import * as QuizActions from '../../store/quiz.actions';
import { QuizModel } from '../../../shared/model/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  public form: FormGroup;

  private readonly _options = [
    { label: 'Jednokrotnego wyboru', value: 'radio' },
    { label: 'Wielokrotnego wyboru', value: 'checkbox' }
  ];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _store: Store<AppState>
    ) {}

  get questionForm() {
    return this._formBuilder.group({
      content: [null, Validators.required],
      image: [null],
      amountOfPoints: [null, [Validators.required, Validators.min(1)]],
      questionType: [null, [Validators.required]],
      answers: this._formBuilder.array([]),
      correctRadio: [null]
    });
  }

  get answerForm() {
    return this._formBuilder.group({
      answerContent: [null, [Validators.required]],
      correct: [null]
    });
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      basic: this._formBuilder.group({
        name: [null, Validators.required],
        description: [null],
        quizTime: [null, [Validators.min(0)]],
        quizStartTime: [null],
        quizEndTime: [null],
      }),
      image: [null],
      questions: this._formBuilder.array([])
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

  change(img: any, name: string) {
    const preview = document.getElementById(name);
    if (img.files && img.files[0]) {
      const reader = new FileReader();
      const self = this;
      reader.addEventListener("load", function() {
        preview['src'] = reader.result;
        self.form.get('image').setValue(reader.result);
      }, false);

      reader.readAsDataURL(img.files[0]);
    }
  }

  public addQuestion() {
    this.questions.push(this.questionForm);
  }

  public addAnswer(index: number) {
    (this.questions.controls[index].get('answers') as FormArray).push(this.answerForm);
  }

  public save() {
    this._store.dispatch(QuizActions.SAVE_QUIZ(
      QuizMapperSerivce.fromFormToOutputFormat<QuizModel>(JSON.parse(JSON.stringify(this.form.value)))
    ));
  }
}
