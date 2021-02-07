import { QuizStartModel } from "@shared/model/quiz.model";
import { UserModel } from "../model/root.model";

export class LocalStorage {

    private static readonly _token: string = 'Authorization';
    private static readonly _userData: string = 'UserData';
    
    public static setAuth(model: UserModel) {
        this.setItem(this._token, model.token);
        delete model.token;
        this.setItem(this._userData, model);
    }

    public static clearAuth() {
        localStorage.removeItem(this._token);
        localStorage.removeItem(this._userData);
    }

    public static clear() {
        localStorage.clear();
    }

    public static getToken(): string {
        return localStorage.getItem(this._token);
    }

    public static getUserData(): UserModel {
        return this.getItem<UserModel>(this._userData);
    }

    public static setQuiz(quiz: QuizStartModel) {
        if (quiz != null) {
            localStorage.setItem(`quiz-${quiz.id}`, JSON.stringify(quiz));
        }
    }

    public static getQuiz<T = QuizStartModel>(id: number | string) {
        return JSON.parse(localStorage.getItem(`quiz-${id}`)) as T;
    }

    public static setItem(name: string, obj: Object): void {
        if (typeof obj === 'string') {
            localStorage.setItem(name, obj);
        } else {
            localStorage.setItem(name, obj? JSON.stringify(obj) : null);
        }
    }

    public static getItem<T = string>(name: string): T {
        return JSON.parse(localStorage.getItem(name)) as T;
    }
}