import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { AppState } from '@shared/store/app-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-entry',
  templateUrl: './confirm-entry.component.html',
  styleUrls: ['./confirm-entry.component.scss']
})
export class ConfirmEntryComponent implements OnInit {

  public loading$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModel,
    private readonly _matDialog: MatDialogRef<ConfirmEntryComponent>,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loading$ = this._store.select(this.data.loadingSelector);
  }

  public clickAction(type: string) {
    switch (type) {
      case 'cancel':
        this._matDialog.close()
        break;
      case 'confirm':
        this._store.dispatch(this.data.action({ id: this.data.element['id'] }))
        break;
    }
  }

}
