export interface CategoryModel {
    readonly id: number;
    lp?: number;
    name: string;
    createDate?: string;
    quizesCount?: number;
}

export interface CategoryEditModel {
    isEdit: boolean;
    content?: CategoryModel;
}


// REST API
export interface CategoryCreateModel {
    name: string;
}

export interface CategoryUpdateModel {
    id: number | string;
    body: {
        name: string;
    }
}
