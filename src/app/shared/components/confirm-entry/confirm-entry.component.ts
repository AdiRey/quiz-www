import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActionType, ConfirmModel } from '@shared/model/components/confirm-entry.model';
import { DialogHandlerService } from '@shared/service/dialog-handler.service';
import { AppState } from '@shared/store/app-state';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-confirm-entry',
  templateUrl: './confirm-entry.component.html',
  styleUrls: ['./confirm-entry.component.scss']
})
export class ConfirmEntryComponent implements OnInit {

  public loading$: Observable<boolean> = of(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModel,
    private readonly _dialogRef: MatDialogRef<ConfirmEntryComponent>,
    private readonly _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    DialogHandlerService.setDialogRef(this._dialogRef);
    if (this.data.loadingSelector) {
      this.loading$ = this._store.select(this.data.loadingSelector);
    }
  }

  public clickAction(type: string) {
    if (type === 'cancel') {
      this._dialogRef.close();
      return;
    }
    switch (this.data.actionType) {
      case ActionType.DELETE:
        this._store.dispatch(this.data.action({ id: this.data.element['id'] }));
        break;
      case ActionType.SAVE:
        this._store.dispatch(this.data.action(this.data.element));
        break;
      case ActionType.CONFIRM:
        this._dialogRef.close('confirm');
        break;
    }
  }

}
