export interface QuizModel {
    readonly id?: number;
    category?: number;
    title: string;
    description?: string;
    time?: number;
    startTime?: any;
    quizEndTime?: any;
    image?: string;
    questions: Array<QuestionModel>;
}

export interface QuizApproachesModel {
    count: number;
}

export interface QuestionModel {
    content: string;
    image?: string;
    pointsCount: number;
    type: string;
    answers: Array<AnswerModel>;
}

export interface AnswerModel {
    content: string;
    correct: boolean;
}

export interface UserQuizWrappedModel {
    array: Array<UserQuizModel>;
}

export interface UserQuizModel {
    questionId: number;
    answersId: Array<number>;
}

export interface QuizStartModel {
    id: number;
    questions: Array<QuizQuestionModel>;
}

export interface QuizQuestionModel{
    id: number;
    image: string;
    pointsCount: number;
    type: string;
    content: string;
    answers: Array<QuizAnswerModel>;
}

export interface QuizAnswerModel {
    id: number;
    content: string;
}

