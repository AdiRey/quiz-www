import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CategoryRestApiService } from 'src/app/shared/api-service/category/category.service';
import { AppState } from 'src/app/shared/store/app-state';
import * as CategoryActions from '../../store/category.actions';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  public cancel() {
    this._dialogRef.close();
  }

  public save() {
    this._store.dispatch(CategoryActions.ADD_CATEGORY(this.form.value));
  }

}
