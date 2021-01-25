import { QuizApproachesModel, QuizStartModel } from "@shared/model/quiz.model";

export interface QuizState {
    editData: any;
    previewData: any;
    approaches: QuizApproachesModel;
    quizComplete: QuizStartModel;
    time: number;
    loading: boolean;
    approachesLoading: boolean;
    quizCompleteLoading: boolean;
}

export const initialQuizState: QuizState = {
    editData: null,
    previewData: null,
    approaches: null,
    quizComplete: null,
    time: null,
    loading: false,
    approachesLoading: false,
    quizCompleteLoading: false
}
