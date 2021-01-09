import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CategoryRestApiService } from '@shared/api-service/category/category.service';
import { CategoryEditModel } from '@shared/model/category.model';
import { AppState } from '@shared/store/app-state';
import * as CategoryActions from '../../store/category.actions';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: CategoryEditModel,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
    if (this._data.isEdit) {
      for (let prop in this.form.controls) {
        this.form.controls[prop].setValue(this._data.content[prop])
      }
    }
  }

  public cancel() {
    this._dialogRef.close();
  }

  public save() {
    this._store.dispatch(
      this._data.isEdit?
        CategoryActions.EDIT_CATEGORY({
          id: this._data.content.id,
          body: this.form.value
        }) :
        CategoryActions.ADD_CATEGORY(this.form.value)
    )
  }

}
