import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CategoryRestApiService } from '@shared/api-service/category.service';
import { CategoryEditModel } from '@shared/model/category.model';
import { DialogHandlerService } from '@shared/service/dialog-handler.service';
import { AppState } from '@shared/store/app-state';
import { Observable } from 'rxjs';
import * as CategoryActions from '../../store/category.actions';
import { selectLoading } from '../../store/category.selector';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  public form: FormGroup;
  public loading$: Observable<boolean> = this._store.select(selectLoading);

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryEditModel,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    DialogHandlerService.setDialogRef(this._dialogRef);
    this.form = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
    if (this.data.isEdit) {
      for (let prop in this.form.controls) {
        this.form.controls[prop].setValue(this.data.content[prop])
      }
    }
  }

  public cancel() {
    this._dialogRef.close();
  }

  public save() {
    this._store.dispatch(
      this.data.isEdit?
        CategoryActions.EDIT_CATEGORY({
          id: this.data.content.id,
          body: this.form.value
        }) :
        CategoryActions.ADD_CATEGORY(this.form.value)
    )
  }

}
