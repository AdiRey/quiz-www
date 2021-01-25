import { RootState } from "@shared/root-store";
import { AuthState } from "src/app/auth/store/auth.state";
import { CategoryState } from "src/app/category/store/category.state";
import { DashboardState } from "src/app/dashboard/store";
import { NewsState } from "src/app/news/store/news.state";
import { QuizState } from "src/app/quiz/store/quiz.state";

export interface AppState {
    root: RootState;
    dashboard: DashboardState;
    auth: AuthState;
    quiz: QuizState;
    category: CategoryState;
    news: NewsState;
}
