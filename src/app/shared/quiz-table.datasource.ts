import { DataSource } from "@angular/cdk/table";
import { FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, finalize } from "rxjs/operators";
import { PaginationModel } from "./abstract-rest-api.model";
import { AbstractRestApi } from "./abstract-rest-api.service";

export class QuizDataSource<T = any> implements DataSource<T> {

    private _innerSubs: Array<Subscription> = [];
    private _dataTable: Array<T>;

    private _loading$ = new BehaviorSubject<boolean>(false);
    private _data$ = new BehaviorSubject<Array<T>>([]);

    // filters
    private _paginator: MatPaginator;
    private _sorter: MatSort;
    private _form: FormGroup;

    private _additionalPath: string = 'list';


    public loading$: Observable<boolean> = this._loading$.asObservable();

    get data() {
        return this._dataTable || [];
    }

    set form(form: FormGroup) {
        if (this._form == form) {
            return;
        }
        this._form = form;
        this._innerSubs.push(
            this._form.valueChanges.pipe(
                distinctUntilChanged(),
                debounceTime(1000)
                ).subscribe(
                data => {
                    this.loadData({
                        additionalPath: this._additionalPath,
                        pagination: {
                            direction: (this._sorter && this._sorter.direction) ? this._sorter.direction.toString() : 'asc',
                            orderBy: (this._sorter && this._sorter.active) ? this._sorter.active : 'id',
                            page: '0',
                            size: this._paginator? String(this._paginator.pageSize) : '20'
                        },
                        params: data
                    });
                }
            )
        )
    }

    set paginator(paginator: MatPaginator) {
        if (this._paginator == paginator) {
            return;
        }
        this._paginator = paginator;
        this._innerSubs.push(
            this._paginator.page.subscribe(
                () => {
                    this.loadData({
                        additionalPath: this._additionalPath,
                        pagination: {
                            direction: (this._sorter && this._sorter.direction) ? this._sorter.direction.toString() : 'asc',
                            orderBy: (this._sorter && this._sorter.active) ? this._sorter.active : 'id',
                            page: String(this._paginator.pageIndex),
                            size: String(this._paginator.pageSize)
                        }
                    });
                }
            )
        );
    }

    set sorter(sorter: MatSort) {
        if (this._sorter == sorter) {
            return;
        }
        this._sorter = sorter;
        this._innerSubs.push(
            this._sorter.sortChange.subscribe(
                () => {
                    this._paginator.pageIndex = 0;
                    this.loadData({
                        additionalPath: this._additionalPath,
                        pagination: {
                            direction: this._sorter.direction.toString() !== ''? this._sorter.direction.toString() : 'asc',
                            orderBy: this._sorter.active,
                            page: '0',
                            size: this._paginator? String(this._paginator.pageSize) : '20'
                        }
                    });
                }
            )
        );
    }


    constructor(
        private readonly _apiService: AbstractRestApi<T>
    ) {}

    public setPathAndLoad(additionalPath: string) {
        this._additionalPath = additionalPath;
        this.loadData();
    }

    public loadData(
        paginationModel: PaginationModel<T> = {
            additionalPath: this._additionalPath,
            pagination: {
                page: '0',
                size: '20',
                direction: 'asc',
                orderBy: 'id'
            }
        }
    ) {
        this._loading$.next(true);

        this._innerSubs.push(
            this._apiService.getAll<T>(paginationModel).pipe(
                catchError(() => []),
                finalize(() => this._loading$.next(false))
            ).subscribe(data => {
                data.list = data.list.map((value, index) => {
                    return { ...value, lp: index + 1 + (this._paginator ? (this._paginator.pageIndex * this._paginator.pageSize) : 0) }
                });
                this._dataTable = data.list;
                this._data$.next(data.list);
                if (this._paginator) {
                    this._paginator.length = data.paginator.totalElements;
                }
            })
        );
    }


    public connect(): Observable<T[] | readonly T[]> {
        return this._data$.asObservable();
    }

    public disconnect(): void {
        this._loading$.complete();
        this._data$.complete();
        this._innerSubs.forEach(sub => sub.unsubscribe());
        this._loading$.unsubscribe();
        this._data$.unsubscribe();
    }

}