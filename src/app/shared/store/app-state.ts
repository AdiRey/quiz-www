import { AuthState } from "src/app/auth/store/auth.state";
import { CategoryState } from "src/app/category/store/category.state";
import { QuizState } from "src/app/quiz/store/quiz.state";

export interface AppState {
    auth: AuthState;
    quiz: QuizState;
    category: CategoryState;
}
