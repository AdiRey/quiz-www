import { MatPaginatorIntl } from "@angular/material/paginator";

export class PaginatorI18n {
    
    getPaginatorIntl(): MatPaginatorIntl {
        const paginatorIntl = new MatPaginatorIntl();
        paginatorIntl.firstPageLabel = 'Pierwsza strona';
        paginatorIntl.lastPageLabel = 'Ostatnia strona';
        paginatorIntl.nextPageLabel = 'Następna strona';
        paginatorIntl.previousPageLabel = 'Poprzednia strona';
        paginatorIntl.itemsPerPageLabel = 'Elementów na stronie';
        paginatorIntl.getRangeLabel = this._getRangeLabel.bind(this);

        return paginatorIntl;
    }

    private _getRangeLabel(page: number, pageSize: number, length: number) {
        if (length === 0 || pageSize === 0) {
            return `0 z ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} z ${length}`;
    }

}