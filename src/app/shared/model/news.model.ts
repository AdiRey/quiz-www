export interface NewsWrappedModel {
    content: Array<NewsModel>;
}

export interface NewsModel {
    id: number;
    name: string;
    latestQuizzes: LatestQuizzesModel;
}

export interface LatestQuizzesModel {
    id: number;
    title: string;
    image: string;
}