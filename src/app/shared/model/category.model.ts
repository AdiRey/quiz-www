export interface CategoryModel {
    readonly id: number;
    lp: number;
    name: string;
    createDate: string;
    quizesCount: number;
}

export interface CategoryCreateModel {
    name: string;
}

export interface CategoryUpdateModel {
    name: string;
}
