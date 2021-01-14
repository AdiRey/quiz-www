export interface QuizModel {
    readonly id?: number;
    title: string;
    description?: string;
    time?: number;
    startTime?: any;
    quizEndTime?: any;
    image?: string;
    questions: Array<QuestionModel>;
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

