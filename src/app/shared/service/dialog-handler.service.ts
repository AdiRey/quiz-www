import { MatDialogRef } from "@angular/material/dialog";


export class DialogHandlerService {

    private static _dialogRef: MatDialogRef<any>;

    public static setDialogRef(dialogRef: MatDialogRef<any>) {
        DialogHandlerService._dialogRef = dialogRef;
    }

    public static closeDialog() {
        try {
            DialogHandlerService._dialogRef.close('complete');
            DialogHandlerService._dialogRef = null;
        } catch {
            throw Error('Dialog hanlder doesn\'t have any reference.')
        }
    }
}