import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { switchMap } from "rxjs/operators";


@Pipe({
    name: 'common'
})
export class CommonPipe implements PipeTransform {

    transform(value: any, type: string) {
        return this._tranform(value, type);
    }

    private _tranform(value, type: string) {
        switch(type) {
            case 'empty':
                return value || '---';
            case 'emptyDate':
                return value ? new DatePipe('pl').transform(value, 'medium') : '---';
            case 'emptyTime':
                return value ? value + ' min' : 'Nielimitowany';
            case 'replaceNull':
                return value.replaceAll('null', '---');
            case 'percentage':
                return Number.isNaN(value) ? 'Błędne dane' : Number.isInteger(value) ? value * 100 + ' %' : value.toFixed(2) * 100 + ' %';
        }
    }

}