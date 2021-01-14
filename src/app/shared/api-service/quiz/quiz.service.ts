import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractRestApi } from "../../abstract-rest-api.service";
import { QuizModel } from "../../model/quiz.model";


@Injectable({
    providedIn: 'root'
})
export class QuizRestApiService extends AbstractRestApi<QuizModel> {

    protected path: string = 'quiz';

    constructor(
        private readonly _http: HttpClient
    ) {
        super(_http);
    }
}