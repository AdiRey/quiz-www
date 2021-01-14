import { AfterViewInit, Directive, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";


@Directive({
    selector: '[onCreate]'
})
export class OnCreateDirective implements AfterViewInit {

    @Output()
    public onCreateEvent: EventEmitter<null> = new EventEmitter();

    ngAfterViewInit() {
        this.onCreateEvent.emit(null);
    }

    constructor() {
    }
}