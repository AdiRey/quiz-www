import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserModel } from "@shared/model/root.model";
import { LocalStorage } from "@shared/service/local-storage.service";


@Directive({
    selector: '[isAdmin]'
})
export class IsAdminDirective {

    constructor(
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _templateRef: TemplateRef<any>
    ) {}

    @Input()
    set isAdmin(active: boolean) {
        if (!active) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
            return;
        }
        const user: UserModel = LocalStorage.getUserData();
        if (user.isAdmin) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainerRef.clear();
        }
    }
}