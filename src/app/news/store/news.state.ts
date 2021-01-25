import { NewsModel } from "@shared/model/news.model";


export interface NewsState {
    data: Array<NewsModel>;
    loading: boolean;
}

export const initalNewsState = {
    data: null,
    loading: false
};
