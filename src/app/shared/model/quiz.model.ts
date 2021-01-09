export interface QuizModel {
    name: string;
    description?: string;
    quizTime?: number;
    quizStartTime?: Object;
    quizEndTime?: Object;
    image?: string;
    questions: Array<QuestionModel>;
}


export interface QuestionModel {
    content: string;
    image?: string;
    amountOfPoints: number;
    questionType: string;
    answers: Array<AnswerModel>;
}

export interface AnswerModel {
    answerContent: string;
    correct: boolean;
}

