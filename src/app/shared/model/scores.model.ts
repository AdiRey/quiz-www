export interface ScoresModel {
    createDate: number;
    quiz: ScoresQuizModel;
}

export interface ScoresQuizModel {
    id: number;
    title: string;
}