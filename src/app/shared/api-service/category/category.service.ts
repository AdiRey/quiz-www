import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractRestApi } from "../../abstract-rest-api.service";
import { CategoryModel } from "../../model/category.model";


@Injectable({
    providedIn: 'root'
})
export class CategoryRestApiService extends AbstractRestApi<CategoryModel> {

    protected path: string = 'quiz-category';

    constructor(
        private readonly _http: HttpClient
    ){
        super(_http);
    }
}